# File: AdvGame.py

"""
This module defines the AdvGame class, which records the information
necessary to play a game.
"""

from AdvRoom import AdvRoom
from AdvObject import AdvObject
from tokenscanner import TokenScanner
from gpl import GWindow, GImage, GLabel

###########################################################################
# Your job in this assignment is to fill in the definitions of the        #
# methods listed in this file, along with any helper methods you need.    #
# Unless you are implementing extensions, you won't need to add new       #
# public methods (i.e., methods called from other modules), but the       #
# amount of code you need to add is large enough that decomposing it      #
# into helper methods will be essential.                                  #
###########################################################################

# Constants
HELP_TEXT = [
    "Welcome to Adventure!",
    "Somewhere nearby is Colossal Cave, where others have found fortunes in",
    "treasure and gold, though it is rumored that some who enter are never",
    "seen again.  Magic is said to work in the cave.  I will be your eyes",
    "and hands.  Direct me with natural English commands; I don't understand",
    "all of the English language, but I do a pretty good job.",
    "",
    "It's important to remember that cave passages turn a lot, and that",
    "leaving a room to the north does not guarantee entering the next from",
    "the south, although it often works out that way.  You'd best make",
    "yourself a map as you go along.",
    "",
    "Much of my vocabulary describes places and is used to move you there.",
    "To move, try words like IN, OUT, EAST, WEST, NORTH, SOUTH, UP, or DOWN.",
    "I also know about a number of objects hidden within the cave which you",
    "can TAKE or DROP.  To see what objects you're carrying, say INVENTORY.",
    "To reprint the detailed description of where you are, say LOOK.  If you",
    "want to end your adventure, say QUIT."
]


"""Graphics Constants"""
CANVAS_WIDTH = 500
CANVAS_HEIGHT = 400
ROOM_OBJECT_X = CANVAS_WIDTH / 50
ROOM_OBJECT_Y = CANVAS_HEIGHT * 0.75
INVENTORY_X = ROOM_OBJECT_X
INVENTORY_Y = CANVAS_HEIGHT / 15
SPACING = 50
OBJ_SIZE = 50


class AdvGame:
    def __init__(self, prefix):
        """initialize the game by reading room, object, and synonym files for chosen game prefix. 
        Sets up inventory"""
        self._rooms = self.readGameFile("assign-6/" + prefix + "Rooms.txt")
        self._objects = self.readObjectFile("assign-6/" + prefix + "Objects.txt")
        self._synonyms = self.readSynonymsFile("assign-6/" + prefix + "Synonyms.txt")
        self._inventory = []
        self._gw = GWindow(CANVAS_WIDTH, CANVAS_HEIGHT)
        self._gw.setWindowTitle("Adventure Game")
        self._room_images = {
            "OUTSIDEBUILDING": "assign-6/outsidebuilding.png",
            "VALLEY": "assign-6/valley.png",
            "INSIDEBUILDING": "assign-6/insidebuilding.png",
            "CAVE": "assign-6/cave.png",
            "ENDOFROAD": "assign-6/endofroad.png",
            "SLITINROCK": "assign-6/slitinrock.png",
            "OUTSIDEGRATE": "assign-6/outsidegrate.png",
            "BENEATHGRATE": "assign-6/beneathgrate.png",
            "COBBLECRAWL": "assign-6/cobblecrawl.png",
            "DARKNESS1": "assign-6/darkness1.png",
            "PIT": "assign-6/pit.png",
            "DEBRISROOM": "assign-6/debrisroom.png",
            "SLOPINGCANYON": "assign-6/slopingcanyon.png",
            "ORANGESTONECHAMBER1": "assign-6/orangestonechamber1.png",
            "ORANGESTONECHAMBER2": "assign-6/orangestonechamber2.png",
            "TWISTYMAZE1": "assign-6/twistymaze1.png",
            "TWISTYMAZE2": "assign-6/twistymaze2.png",
            "TWISTYMAZE3": "assign-6/twistymaze3.png",
            "TWISTYMAZE4": "assign-6/twistymaze4.png",
            "TWISTYMAZE5": "assign-6/twistymaze5.png",
            "TWISTYMAZE6": "assign-6/twistymaze6.png",
            "TWISTYMAZE7": "assign-6/twistymaze7.png",
            "HALLOFTHEMOUNTAINKING1": "assign-6/hallofthemountainking1.png",
            "HALLOFTHEMOUNTAINKING2": "assign-6/hallofthemountainking2.png",
            "EASTSIDEECHAMBER": "assign-6/eastsidechamber.png",
            "WESTSIDEECHAMBER": "assign-6/westsidechamber.png",
            "LOWNSPASSAGE": "assign-6/lownspassage.png",
            "BLOCKEDBYSNAKE": "assign-6/blockedbysnake.png",
            "BRINKOFPIT": "assign-6/brinkofpit.png",
            "PIRATELAIR": "assign-6/piratelair.png",
            "LONGCURVINGPASSAGE": "assign-6/longcurvingpassage.png",
            "HALLOFMISTSWEST": "assign-6/hallofmistswest.png",
            "FATALJUMP": "assign-6/fataljump.png",
            "CRYSTALBRIDGEWEST": "assign-6/crystalbridgewest.png",
            "WAVERODWEST": "assign-6/waverodwest.png",
            "BLOCKEDBYFISSUREWEST": "assign-6/blockedbyfissurewest.png",
            "WESTBANKOFFISSURE": "assign-6/westbankoffissure.png",
            "CRYSTALBRIDGEEAST": "assign-6/crystalbridgeeast.png",
            "WAVERODEAST": "assign-6/waverodeast.png",
            "BLOCKEDBYFISSUREEAST": "assign-6/blockedbyfissureeast.png",
            "EASTBANKOFFISSURE": "assign-6/eastbankoffissure.png",
            "UNSEENFORCE": "assign-6/unseenforce.png",
            "NUGGETROOM": "assign-6/nuggetroom.png",
            "HALLOFMISTS": "assign-6/hallofmists.png",
            "NARROWCRACK": "assign-6/narrowcrack.png",
            "TOPOPIT": "assign-6/topofpit.png",
            #... there are more, but i didn't want to GPT generate any more
        }

        self._object_images = {
            "WATER": "assign-6/water.png",
            "KEYS": "assign-6/keys.png",
            "LAMP": "assign-6/lamp.png",
            "ROD": "assign-6/rod.png",
            "BIRD": "assign-6/bird.png",
            "NUGGET": "assign-6/nugget.png",
            "DIAMOND": "assign-6/diamond.png",
            "COINS": "assign-6/coins.png",
            "EMERALD": "assign-6/emerald.png",
            "EGGS": "assign-6/eggs.png",
            "PLANT": "assign-6/plant.png",
            "CHEST": "assign-6/chest.png"
        }
        self.should_show_inventory = False

    def show_room_image(self, room_name):
        """GRAPHICS EXTENSION to show the room image and objects in the room. Calls show_inventory() if the user wants to show inventory"""
        self._gw.clear()
        image_file = self._room_images.get(room_name.upper())
        if image_file is None:
            image_file = "ssign-6/samplerquilt.png"
        room_img = GImage(image_file, 0, 0)
        scale_factor = CANVAS_HEIGHT / room_img.getHeight()
        room_img.scale(scale_factor)
        self._gw.add(room_img)

        room = self._rooms[room_name]
        objects = room.getContents()
        x = int(ROOM_OBJECT_X)
        for obj in objects:
            img_path = self._object_images.get(obj.getName().upper())
            if img_path:
                obj_img = GImage(img_path, x, int(ROOM_OBJECT_Y))
                scale_factor = OBJ_SIZE / obj_img.getWidth()
                obj_img.scale(scale_factor)
                self._gw.add(obj_img)
                x += OBJ_SIZE + 10
        
        if self.should_show_inventory:
            self.show_inventory()

    def show_inventory(self):
        """GRAPHICS EXTENSION to show the inventory images"""
        x = INVENTORY_X
        inventory_label = GLabel("Inventory:", x, INVENTORY_Y - 8)
        self._gw.add(inventory_label)
        for obj in self._inventory:
            img_path = self._object_images.get(obj.getName().upper())
            if img_path:
                obj_img = GImage(img_path, x, INVENTORY_Y)
                if obj_img.getWidth() != OBJ_SIZE:
                    scale_factor = OBJ_SIZE / obj_img.getWidth()
                    obj_img.scale(scale_factor)
                self._gw.add(obj_img)
                x += OBJ_SIZE + 10

    
    def readGameFile(self, filepath):
        """Open the .txt room file and loads the room map into the game."""
        with open(filepath) as rf:
            return AdvGame.readGame(rf)
    
    def readObjectFile(self, filepath):
        """Open the .txt objects file and load all game objects."""
        with open(filepath) as of:
            return AdvGame.readObjects(of)
        
    def readSynonymsFile(self, filepath):
        """Read the .txt synonyms file and store command synonyms."""
        synonyms = {}
        with open(filepath) as sf:
            for line in sf:
                line = line.strip()
                if not line: continue
                i = line.find("=")
                if i == -1: continue
                synonyms[line[:i]] = line[i+1:]
        return synonyms

    def run(self):
        self.distribute_objects()
        print_bool = True # control flag if we should print the description
        current = "START"
        while current != "EXIT":
            room = self.getRoom(current)
            room = self.forced_motion(room)
            if room == "EXIT":
                break

            self.show_room_image(room.getName())
            if print_bool:
                if room.hasBeenVisited():
                    self.print_room(room, False) # Short desc if visited
                else:
                    self.print_room(room, True)
                room.setVisited(True)
            user_input = input("> ").strip().upper()
            scanner = TokenScanner(user_input)
            scanner.ignoreWhitespace()
            current, print_bool = self.execute_action(room, scanner, current)
        self._gw.wait_for_close()

    def getRoom(self, name):
        """Returns the room with the specified name."""
        if name == "EXIT":
            return "EXIT"
        return self._rooms[name]

    def distribute_objects(self):
        """Put each object in its starting location"""
        for obj in self._objects.values():
            loc = obj.getInitialLocation()
            if loc != "PLAYER":
                self._rooms[loc].addObject(obj)
            else:
                self._inventory.append(obj)

    def forced_motion(self, room):
        """Handles forced motion until there are no more. Returns the final room you end up in."""
        while True:
            if room == "EXIT":
                break
            # set a flag to indicate whether or not there is a forced passage in this room
            forced_found = False
            # for every passage in this room, try to find forced transitions
            for passage, next_room, key in room.getPassages():
                if passage == "FORCED":
                    #if player has the required object for this forced passage
                    has_key = False
                    for obj in self._inventory:
                        if obj.getName() == key:
                            has_key = True
                            break
                    # passage is unlocked (no key needed or you have it), take the forced exit
                    if key == None or has_key:
                        self.print_room(room, True)  # show long description for forced motion
                        room = self.getRoom(next_room) # move to new room and exit the focred loop
                        forced_found = True 
                        break
            if not forced_found:
                break
        return room 
    
    def getNextRoom(self, current_room, verb):
        """Returns the name of next room after applying verb."""
        passages = current_room.getPassages() 
        for passage, next_room, key in passages:
            if passage == verb:
                has_key = False
                for obj in self._inventory:
                    if obj.getName() == key:
                        has_key = True
                        break
                if key == None or has_key:
                    return next_room

        #check for *
        for passage, next_room, key in passages:
            if passage == "*":
                return next_room
        return None

    def print_room(self, room, long_desc):
        """Print either the long or short room description and list of objects in the room"""
        if long_desc:
            for line in room.getLongDescription():
                print(line)
            for obj in room.getContents():
                print("There is " + obj.getDescription() + " here.")
        else:
            print(room.getShortDescription())


    def execute_action(self, room, scanner, current):
        """interprets and run a user's input command. 
        Handles movement, game actions, object take/drop, help, quit, etc."""
        while scanner.hasMoreTokens():
            action = scanner.nextToken() 
            if action in self._synonyms:
                action = self._synonyms[action]
            match action: #works only in newest ptyhon generation
                case "QUIT":
                    current = "EXIT"
                    print_bool = False
                    self.should_show_inventory = False
                case "HELP":
                    for line in HELP_TEXT:
                        print(line)
                    print_bool = False
                    self.should_show_inventory = False
                case "LOOK":
                    self.print_room(room, True)
                    print_bool = False
                    self.should_show_inventory = False
                case "INVENTORY":
                    if not self._inventory:
                        print("You are empty-handed.")
                    else:
                        print("You are carrying:")
                        for obj in self._inventory:
                            print(obj.getDescription())
                    self.should_show_inventory = True
                    print_bool = False
                case "TAKE":
                    obj_name = scanner.nextToken()
                    for obj in room.getContents():
                        if obj.getName().upper() == obj_name:
                            self._inventory.append(obj)
                            room.removeObject(obj)
                            print("Taken.")
                            break
                    print_bool = False
                    self.should_show_inventory = False
                case "DROP":
                    obj_name = scanner.nextToken()
                    for obj in self._inventory:
                        if obj.getName().upper() == obj_name:
                            self._inventory.remove(obj)
                            room.addObject(obj)
                            print("Dropped.")
                            break
                    print_bool = False
                    self.should_show_inventory = False
                case _:
                    next = self.getNextRoom(room, action)
                    if next is None:
                        print("I don't understand that command")
                        next = current
                    current = next
                    print_bool = True
                    self.should_show_inventory = False
        return current, print_bool
          

    @staticmethod
    def readGame(rf):
        """Reads the entire game from the rooms data file."""
        rooms = { }
        while True:
            room = AdvRoom.readRoom(rf)
            if room is None: break
            if len(rooms) == 0:
                rooms["START"] = room
            room_name = room.getName()
            rooms[room_name] = room
        return rooms
    
    @staticmethod
    def readObjects(of):
        """Reads all objects from the objects data file."""
        objects = { }
        while True:
            object = AdvObject.readObject(of)
            if object is None: break
            obj_name = object.getName()
            objects[obj_name] = object
        return objects

