# File: AdvRoom.py

"""
This module is responsible for modeling a single room in Adventure.
"""
from AdvObject import AdvObject

###########################################################################
# Your job for Milestone #1 is to fill in the definitions of the         #
# methods listed in this file, along with any helper methods you need.    #
# The public methods shown in this file are the ones you need for         #
# Milestone #1.  You will need to add other public methods for later      #
# milestones, as described in the handout.  For Milestone #7, you will    #
# need to move the getNextRoom method into the AdvGame class and replace  #
# it with a getPassages method that returns the dictionary of passages.   #
###########################################################################

# Constants

MARKER = "-----"

class AdvRoom:

    def __init__(self, name, shortdesc, longdesc, passages):
        """Creates a new room with the specified attributes."""
        self._name = name
        self._shortdesc = shortdesc
        self._longdesc = longdesc
        self._passages = passages
        self._visited = False
        self._objectlist = []

    def getName(self):
        """Returns the name of this room.."""
        return self._name

    def getShortDescription(self):
        """Returns a one-line short description of this room.."""
        return self._shortdesc

    def getLongDescription(self):
        """Returns the list of lines describing this room."""
        return self._longdesc
    
    def getPassages(self):
        """Returns the list of exits and connections for this room"""
        return self._passages
    
    def getContents(self):
        """Return all objects currently in the room."""
        return self._objectlist
    
    def containsObject(self, name):
        """Checks if this room contains an object by name."""
        return name in self._objectlist
    
    def setVisited(self, bool):
        """Mark if you've ever entered this room yet"""
        self._visited = bool

    def hasBeenVisited(self):
        """Check whether the player has already visited the room"""
        return self._visited
    
    def addObject(self, obj):
        """Add an object to this room"""
        self._objectlist.append(obj)

    def removeObject(self, obj):
        """Remove an object from the room"""
        self._objectlist.remove(obj)
    

    @staticmethod
    def readRoom(f):
        """Reads a room from the data file."""
        name = f.readline().rstrip()
        if name == "":
            return None
        shortdesc = f.readline().rstrip()
        longdesc = [ ]
        while True:
            line = f.readline().rstrip()
            if line == MARKER: break
            longdesc.append(line)
        passages = [ ]
        while True:
            line = f.readline().rstrip()
            if line == "": break
            colon = line.find(":")
            if colon == -1:
                raise ValueError("Missing colon in " + line)
            slash = line.find("/")
            if slash == -1:
                # object NOT required
                response = line[:colon].strip().upper()
                next = line[colon + 1:].strip()
                obj_rqd = None
            else:
                # object IS required
                response = line[:colon].strip().upper()
                next = line[colon + 1:slash].strip()
                obj_rqd = line[slash + 1:].strip()
            passages.append((response, next, obj_rqd))
        return AdvRoom(name, shortdesc, longdesc, passages)
