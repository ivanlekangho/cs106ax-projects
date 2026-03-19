# Enigma Simulator — Encryption Machine
**Stanford CS106AX — Ivan Ho**

![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)
![Node.js](https://img.shields.io/badge/Runtime-Node.js-green)

---

## Overview

A fully functional simulation of the **Enigma cipher machine** — the encryption device used by Nazi Germany in World War II, famously broken by Alan Turing at Bletchley Park. The simulator accurately models the mechanical and logical components of Enigma, allowing plaintext messages to be encrypted and decrypted using historically consistent settings.

Built with a focus on **algorithmic correctness, data abstraction, and careful state management**.

---

## Technical Skills Demonstrated

| Area | Details |
|---|---|
| **Algorithms** | Accurate simulation of stateful mechanical transformation pipelines |
| **Data abstraction** | Rotors, reflector, and plugboard implemented as independent modular components |
| **State management** | Correct handling of rotor stepping mechanics and mutable state |
| **Correctness** | Deterministic encryption/decryption — same settings always reverse the cipher |

---

## How the Machine Works

Enigma's behavior depends on four independently configurable components:

- **Rotor wiring and ordering** — each rotor applies a letter substitution
- **Rotor stepping mechanics** — rotors advance with each keypress, changing the cipher
- **Plugboard substitutions** — additional letter-swap layer before and after the rotors
- **Reflector mapping** — sends the signal back through the rotors in reverse

---

## How to Run

```bash
node enigma.js
```

Requires Node.js.

---

## Concepts Demonstrated

- Algorithmic simulation of mechanical systems
- Stateful transformation pipelines
- Modular data abstraction
- Edge case handling in complex state machines

---
---
---

# Adventure with Graphics 🥇
**Stanford CS106AX — Ivan Ho**

![Python](https://img.shields.io/badge/Python-3.10-blue)
![Award](https://img.shields.io/badge/Award-1st%20Place%20Course%20Competition-gold)

---

## Overview

An interactive graphical program that placed **first in a course-wide graphics competition** at Stanford. The project combines algorithmic reasoning with graphical rendering and event-driven interaction, emphasizing **clean abstraction, reliable state management, and creative problem-solving**.

The emphasis is on well-structured behavior and correctness rather than visual complexity alone.

---

## Technical Skills Demonstrated

| Area | Details |
|---|---|
| **Graphics programming** | Programmatic rendering of interactive graphical elements |
| **Event-driven design** | Logic responding cleanly to user input and state transitions |
| **Abstraction** | Clear separation between game state, rendering logic, and control flow |
| **Debugging** | Robust handling of state transitions and redraws |

---

## Features

- Interactive graphical elements rendered programmatically
- Event-driven logic responding to user input
- Clear separation between game state, rendering, and control flow
- Robust handling of state transitions

---

## How to Run

```bash
python Adventure.py
```

Requires Python 3 and the CS106AX graphics support library.

---

## Concepts Demonstrated

- Graphics programming and event handling
- Algorithmic control of visual systems
- Modular program design and abstraction
- Creative problem-solving within technical constraints
