# Flutterer

Flutterer is a simplified social media platform inspired by Twitter/X, developed as part of **Stanford CS106AX**. The project implements a **client–server architecture** supporting user accounts, posts, and timelines, with a focus on **modular design, abstraction, and correctness**.

---

## Overview

The goal of Flutterer was to design and implement a small but complete networked system. Rather than maximizing features, the project emphasizes:

* Clear separation of responsibilities between server components
* Correct handling of user state and requests
* Readable, maintainable program structure

The project prioritizes **systems reasoning and abstraction** over UI polish.

---

## Features

* Posting short messages (“floots”)
* Creating comments
* Liking posts and comments
* Viewing timelines and user feeds
* Server-side request handling and state management
* Automatic server restart during development

---

## Architecture

* **Backend:** Python-based server
* **Design model:** Client–server architecture
* **Entry point:** `run_server.py`

The server monitors source files and automatically restarts when changes are detected, enabling rapid debugging and iterative development.

---

## How to Run

1. Ensure Python 3 is installed.
2. From the project root, start the server:

   ```bash
   python run_server.py
   ```
3. The server will launch locally and restart automatically when server files are modified.

> This project is intended for local development and instructional use only.

---

## Concepts Demonstrated

* Client–server system design
* Abstraction and modular program structure
* Stateful request handling
* Debugging and incremental development
* Algorithmic problem-solving in a systems context

