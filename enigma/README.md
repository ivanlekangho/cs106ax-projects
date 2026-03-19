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
