# Enigma Simulator

This project implements a functional simulation of the **Enigma encryption machine**, developed as part of **Stanford CS106AX**. The simulator models the core mechanical and logical components of Enigma, emphasizing **algorithmic correctness, abstraction, and state management**.

---

## Overview

The Enigma machine is a stateful encryption system whose behavior depends on:

* Rotor wiring and ordering
* Rotor stepping mechanics
* Plugboard substitutions
* Reflector mappings

This project reproduces those components in software, allowing plaintext messages to be encrypted and decrypted in a way consistent with the historical machine.

---

## Features

* Configurable rotor order and initial positions
* Plugboard substitution mapping
* Accurate rotor stepping logic
* Deterministic encryption and decryption (same settings reverse the cipher)

---

## Concepts Demonstrated

* Stateful systems and transformation pipelines
* Algorithmic simulation of mechanical processes
* Data abstraction and modular program design
* Careful handling of mutable state and edge cases

---

## Implementation Notes

* Written in JavaScript (`enigma.js`)
* Components (rotors, reflector, plugboard) are implemented as independent abstractions
* Emphasis on clarity and correctness rather than performance optimization

---

## How to Run

```bash
node enigma.js
```

(Requires Node.js.)

