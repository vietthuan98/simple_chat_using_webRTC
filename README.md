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
