/*
 * File: Enigma.js
 * ---------------
 * This program implements a graphical simulation of the Enigma machine.
 */

"use strict";

/* Main program */

function Enigma() {
	let enigmaImage = GImage("EnigmaTopView.png");
	enigmaImage.addEventListener("load", function() {
		let gw = GWindow(enigmaImage.getWidth(), enigmaImage.getHeight());
		gw.add(enigmaImage);
		runEnigmaSimulation(gw);
   });
}

// You are responsible for filling in the rest of the code.  Your
// implementation of runEnigmaSimulation should perform the
// following operations:
//
// 1. Create an object that encapsulates the state of the Enigma machine.
// 2. Create and add graphical objects that sit on top of the image.
// 3. Add listeners that forward mouse events to those objects.

function runEnigmaSimulation(gw) {
	/**
	 * Initialises the engima machine's state and creates the visuals:
	 * - Creates the enigma object to store its keys, lamps, and rotors (as arrays)
	 * - Draws the keyboard, lamps, and rotors onto the gwindow
	 * - Adds event listeners for mouse clicks and keyboard clicks
	 */
	let enigma = {
		keys: [],
		lamps: [],
		rotors: [],
	};

	createKeyboard(gw, enigma);
	createLampPanel(gw, enigma);
	createRotors(gw, enigma);

	function createKeyboard(gw, enigma) {
		/**
		 * Creates 26 keys of the German keyboard
		 * Adds event listeners so we can change the color of the keys and encrypt the plaintext
		 * Pushes keys onto keys array of enigma
		 */
		for (let i = 0; i < 26; i++) {
			let keyObject = GCompound();

			let keyBorderObject = GOval((KEY_RADIUS + KEY_BORDER) * 2, (KEY_RADIUS + KEY_BORDER) * 2); 
			keyBorderObject.setColor(KEY_BORDER_COLOR);
			keyBorderObject.setFilled(true);

			let keyInnerObject = GOval(KEY_RADIUS * 2, KEY_RADIUS * 2); 
			keyInnerObject.setColor(KEY_BGCOLOR);
			keyInnerObject.setFilled(true);

			let letter = String.fromCharCode(65 + i);
			let keyLetterObject = GLabel(letter);
			let keyLetterColor = KEY_UP_COLOR;
			keyLetterObject.setFont(KEY_FONT);
			keyLetterObject.setColor(keyLetterColor);
			keyLetterObject.setTextAlign("center");
			keyLetterObject.setBaseline("middle");

			keyObject.add(keyBorderObject, 0, 0);
			keyObject.add(keyInnerObject, KEY_BORDER, KEY_BORDER);
			keyObject.add(keyLetterObject, KEY_RADIUS + KEY_BORDER, KEY_RADIUS + KEY_BORDER);

			let keyX = KEY_LOCATIONS[i].x;
			let keyY = KEY_LOCATIONS[i].y;
			gw.add(keyObject, keyX - (KEY_RADIUS + KEY_BORDER), keyY - (KEY_RADIUS + KEY_BORDER));

			keyObject.label = keyLetterObject; // defined a field within keyObject

			keyObject.mousedownAction = function(enigma) {
				/**
				 * This function is defined as a field within keyObject
				 * It advances the rotors and encrypts the letter
				 * Lights up the key and lamp
				 */
				// fast rotor always advances
				if (advanceRotor(enigma.rotors[2])) {    
					// medium rotor advances after when the fast rotor completes a cycle
					if (advanceRotor(enigma.rotors[1])) { 
						// slow rotor advances after when the medium rotor completes a cycle
						advanceRotor(enigma.rotors[0]);
					}
				}
				keyObject.label.setColor(KEY_DOWN_COLOR);
				// encrypt letter, then light up that lamp
				let outputIndex = encryptLetter(i, enigma);
				enigma.lamps[outputIndex].label.setColor(LAMP_ON_COLOR);
			};

			keyObject.mouseupAction = function(enigma) {
				/** 
				 * This function is defined as a field within keyObject
				 * Returns keyboard color to normal and turns off the lamp of encrypted letter
				 */
				keyObject.label.setColor(KEY_UP_COLOR);
				let outputIndex = encryptLetter(i, enigma);
				enigma.lamps[outputIndex].label.setColor(LAMP_OFF_COLOR);
			};

			enigma.keys.push(keyObject); // pushes the keyObject onto the key field of enigma
		}

		function encryptLetter(inputIndex, enigma) {
			/**
			 * This function passes the input index through all three rotors forward (from fast to slow), reflects off reflector, then all three rotors backward
			 * Returns the output index of the encrypted letter
			 */
			let outputIndex = inputIndex;
			// forward pass
			for (let a = 2; a >= 0; a --) {
				outputIndex = applyPermutation(outputIndex, enigma.rotors[a].permutation, enigma.rotors[a].offset);
			}

			// reflection
			outputIndex = applyReflector(outputIndex);

			// backward pass
			for (let b = 0; b <= 2; b ++) {
				outputIndex = applyInversePermutation(outputIndex, enigma.rotors[b].permutation, enigma.rotors[b].offset);
			}
			return outputIndex
		}
		
		function applyPermutation(inputIndex, permutation, offset) {
			/**
			 * 	Applies the permutation by adding an offset, finding the offset-ed permutation, then subtracting the offset
			 */
			let offsetInputIndex = ((inputIndex + offset) % 26);
			let offsetOutputChar = permutation[offsetInputIndex];
			let outputIndex = (offsetOutputChar.charCodeAt(0) - 65 - offset + 26) % 26;
			return outputIndex;
		}

		function applyReflector(inputIndex) {
			/**
			 * Applies the fixed reflector permutation
			 */
			let offsetOutputChar = REFLECTOR_PERMUTATION[inputIndex];
			let outputIndex = (offsetOutputChar.charCodeAt(0) - 65 + 26) % 26;
			return outputIndex;
		}

		function applyInversePermutation(inputIndex, permutation, offset) {
			/**
			 * Applies the inverse permutation by adding the offset, finding the corresponding encrypted letter, then outputting the offset-ed permutation index, the subtracting the offset
			 */
			let offsetInputIndex = ((inputIndex + offset) % 26);
			let offsetOutputChar = String.fromCharCode(65 + offsetInputIndex);
			let outputIndex = (permutation.indexOf(offsetOutputChar) - offset + 26) % 26;
			return outputIndex;
		}

		let mousedownAction = function(e) {
			/**
			 * When user clicks on the gwindow, if there is an object and that object possesses the mousedownAction function, call it
			 */
			let obj = gw.getElementAt(e.getX(), e.getY());
			if (obj !== null && obj.mousedownAction !== undefined)
				obj.mousedownAction(enigma);
		};

		let mouseupAction = function(e) {
			/**
			 * When user clicks on the gwindow, if there is an object and that object possesses the mouseupAction function, call it
			 */
			let obj = gw.getElementAt(e.getX(), e.getY());
			if (obj !== null && obj.mouseupAction !== undefined)
				obj.mouseupAction(enigma);
		};

		function keyDownEvent(e) {
			/**
			 * When user clicks a key on their keyboard, it triggers the same event obj.mousedownAction(enigma)
			 */
			let key = e.key.toUpperCase() // gets the key of the key click event
			if (key >= "A" && key <= "Z") {
				let index = key.charCodeAt(0) - 65;
				let obj = enigma.keys[index];
				if (obj !== null && obj.mouseupAction !== undefined) {
					obj.mousedownAction(enigma);
				}
			} 
		}

		function keyUpEvent(e) {
			/**
			 * When user releases that key on their keyboard, it triggers the same event obj.mouseupAction(enigma)
			 */
			let key = e.key.toUpperCase()
			if (key >= "A" && key <= "Z") {
				let index = key.charCodeAt(0) - 65;
				let obj = enigma.keys[index];
				if (obj !== null && obj.mouseupAction !== undefined) {
					obj.mouseupAction(enigma);
				}
			} 
		}

		// install all mouse and keyboard event listeners
		gw.addEventListener("mousedown", mousedownAction);
		gw.addEventListener("mouseup", mouseupAction);
		gw.addEventListener("keydown", keyDownEvent);
		gw.addEventListener("keyup", keyUpEvent);
	}

	function createLampPanel(gw, enigma) {
		/**
		 * Creates 26 lamps and pushes them as objects onto lamp array of engima object
		 */
		for (let i = 0; i < 26; i++) {
			let lampObject = GCompound();

			let lampBorderObject = GOval(LAMP_RADIUS * 2, LAMP_RADIUS * 2); 
			lampBorderObject.setColor(LAMP_BORDER_COLOR);
			lampBorderObject.setFilled(true);

			let letter = String.fromCharCode(65 + i);
			let lampLetterObject = GLabel(letter);
			let lampLetterColor = LAMP_OFF_COLOR;
			lampLetterObject.setFont(LAMP_FONT);
			lampLetterObject.setColor(lampLetterColor);
			lampLetterObject.setTextAlign("center");
			lampLetterObject.setBaseline("middle");

			lampObject.add(lampBorderObject, 0, 0);
			lampObject.add(lampLetterObject, LAMP_RADIUS, LAMP_RADIUS);

			let lampX = LAMP_LOCATIONS[i].x;
			let lampY = LAMP_LOCATIONS[i].y;
			gw.add(lampObject, lampX - LAMP_RADIUS, lampY - LAMP_RADIUS);

			lampObject.label = lampLetterObject; 

			enigma.lamps.push(lampObject);
		}
	}

	function createRotors(gw, enigma) {
		/**
		 * Creates 3 rotors and allows clicks to manually advance each rotor.
		 * Pushes these rotor objects onto rotor array of enigma objet.
		 */
		for (let i = 0; i < 3; i++) {
			let rotorObject = GCompound();

			rotorObject.offset = 0;

			let rotorBorderObject = GRect(ROTOR_WIDTH, ROTOR_HEIGHT); 
			rotorBorderObject.setColor(ROTOR_BGCOLOR);
			rotorBorderObject.setFilled(true);

			let rotorLetterObject = GLabel(String.fromCharCode(65 + rotorObject.offset));
			rotorLetterObject.setFont(ROTOR_FONT);
			rotorLetterObject.setColor(ROTOR_COLOR);
			rotorLetterObject.setTextAlign("center");
			rotorLetterObject.setBaseline("middle");

			rotorObject.add(rotorBorderObject, 0, 0);
			rotorObject.add(rotorLetterObject, ROTOR_WIDTH / 2, ROTOR_HEIGHT / 2);

			let rotorX = ROTOR_LOCATIONS[i].x;
			let rotorY = ROTOR_LOCATIONS[i].y;
			gw.add(rotorObject, rotorX - ROTOR_WIDTH / 2, rotorY - ROTOR_HEIGHT / 2);

			rotorObject.label = rotorLetterObject; 

			rotorObject.permutation = ROTOR_PERMUTATIONS[i];

			rotorObject.clickAction = function() {
				/**
				 * Calls advanceRotor() on this rotor when clicked
				 */
				advanceRotor(rotorObject);
			};

			enigma.rotors.push(rotorObject);
		} 

		let clickAction = function(e) {
			/**
			 * Gets the rotor that is clicked, if it exists and contains the obj.clickAction function as a field
			 * Runs clickAction (defined for each rotor) on that object
			 */
			let obj = gw.getElementAt(e.getX(), e.getY());
			if (obj !== null && obj.clickAction !== undefined) // if the object we just pressed has the function clickAction
				obj.clickAction(enigma);
		};

		// installs click event listener to gw
		gw.addEventListener("click", clickAction);
	}

	function advanceRotor(rotorObject) {
		/**
		 * Advances the rotor's offset position by 1 every time it is called
		 * Sets the rotor's label to be the next character
		 * Returns true if offset circles back to 26 (= 0 mod 26 which indicates a full rotation)h
		 */
		rotorObject.offset = (rotorObject.offset + 1) % 26;
		rotorObject.label.setLabel(String.fromCharCode(65 + rotorObject.offset))
		return rotorObject.offset === 0;
	}
}


function leaders(array) {
	let result = [];
	for (let i = 0; i < array.length; i++) {
		let leader = true;
		for (let j = i + 1; j < array.length; j++) {
			if (array[i] <= array [j]) {
				leader = false;
			}
		}
		if (leader) {
			result.push(array[i]);
		}
	}
	result.push(array[array.length - 1]);
	return result;
}