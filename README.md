# Setup
```
npm run install
node server.js
```
Open two tabs at `http://localhost:3000/`:
1. Tab 1: Clicking `Start caller`
2. Tab 2: Clicking `Start callee`
3. Can chat

# A. Signaling server
- Nodejs
- RestfulAPI
# B. Client (caller + callee)
1. Caller: send offer
2. Callee: get offer, send answer
3. Caller: get answer, send ICE offer-candidate
4. Callee: get ICE offer-candidate, send ICE answer-candidate
5. Caller: get ICE answer-candidate
6. P2P Connection has been established

```
Client A (Caller)                          Signaling Server                         Client B (Callee)
-----------------                          -----------------                        -----------------
     |                                            |                                         |
     |------> [POST] /offer (SDP offer) --------->|                                         |
     |                                            |                                         |
     |                                            |<-------- [GET] /offer -----------------|
     |                                            |                 (Retrieve offer)       |
     |                                            |                                         |
     |                                            |<-- [POST] /answer (SDP answer) --------|
     |                                            |                                         |
     |<------- [GET] /answer (Retrieve answer) ---|                                         |
     |                                            |                                         |
     |-- [POST] /offer-candidate (ICE) ---------->|                                         |
     |                                            |<-------- [GET] /offer-candidates ------|
     |                                            |                (Caller ICE)            |
     |                                            |                                         |
     |                                            |<-- [POST] /answer-candidate (ICE) -----|
     |<------- [GET] /answer-candidates ----------|                                         |
     |         (Callee ICE)                       |                                         |
     |                                            |                                         |
     |=========== Direct P2P Connection ==========|=========== Direct P2P Connection ======|
     |                                            |                                         |
     |<================= DataChannel =========================>|
```
### Plus
What do the SDP offer and the ICE Candidate mean? (from ChatGPT ^^)
| Term              | What it Means                                      | Purpose                           |
| ----------------- | -------------------------------------------------- | --------------------------------- |
| **SDP Offer**     | Capabilities from caller (media, codecs, channels) | Start connection negotiation      |
| **SDP Answer**    | Response from callee with its compatible settings  | Finalize negotiation              |
| **ICE Candidate** | Possible network routes (IP/port combos)           | Find the best path for connection |


