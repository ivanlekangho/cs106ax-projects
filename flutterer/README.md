# Flutterer — Social Media Platform
**Stanford CS106AX — Ivan Ho**

![Python](https://img.shields.io/badge/Python-3.10-blue)
![Architecture](https://img.shields.io/badge/Architecture-Client--Server-orange)

---

## Overview

Flutterer is a simplified Twitter/X-inspired social media platform built on a **client–server architecture**. The project implements a complete networked system from scratch — user accounts, posts, timelines, and server-side state — with an emphasis on **modular design, clean abstraction boundaries, and correctness**.

The goal was not to maximize features but to build a small system whose components are clearly separated, easy to reason about, and reliable under iterative development.

---

## Technical Skills Demonstrated

| Area | Details |
|---|---|
| **Architecture** | Client–server design with clear separation of responsibilities |
| **Backend** | Python server handling stateful requests |
| **Systems thinking** | Modular component design, abstraction layers |
| **Dev workflow** | Auto-restarting server on file change for rapid iteration |

---

## Features

- User accounts and authentication
- Posting short messages ("floots") and comments
- Liking posts and comments
- Timeline and user feed views
- Server-side request handling and state management
- Automatic server restart on source file changes

---

## How to Run

```bash
python run_server.py
```

Requires Python 3. The server launches locally and restarts automatically when server files are modified.

> Intended for local development and instructional use only.

---

## Concepts Demonstrated

- Client–server system design
- Stateful request handling
- Abstraction and modular program structure
- Incremental development and debugging in a networked context

---
