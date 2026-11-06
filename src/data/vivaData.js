// Comprehensive Viva Questions Database for all 19 Experiments
export const VIVA_QUESTIONS = [
  // Exp 1: WLAN
  {
    id: "v1-1",
    expId: 1,
    expTitle: "01 — WIRELESS LAN (WLAN)",
    question: "What is an SSID in wireless networking?",
    answer: "SSID (Service Set Identifier) is a unique 32-character case-sensitive alphanumeric name identifying a specific IEEE 802.11 wireless network.",
    difficulty: "EASY",
    category: "WLAN"
  },
  {
    id: "v1-2",
    expId: 1,
    expTitle: "01 — WIRELESS LAN (WLAN)",
    question: "Why does 802.11 WLAN use CSMA/CA instead of Ethernet's CSMA/CD?",
    answer: "In wireless systems, a transmitting radio's own signal drowns out any incoming signals, making simultaneous collision detection impossible. Hence, collision avoidance with random backoff (CSMA/CA) is mandatory.",
    difficulty: "IMPORTANT",
    category: "WLAN"
  },
  {
    id: "v1-3",
    expId: 1,
    expTitle: "01 — WIRELESS LAN (WLAN)",
    question: "What is the difference between BSS and ESS in 802.11 architecture?",
    answer: "A BSS (Basic Service Set) consists of one AP and its associated clients. An ESS (Extended Service Set) connects multiple BSSs together via a common Distribution System (DS) sharing one SSID.",
    difficulty: "MEDIUM",
    category: "WLAN"
  },

  // Exp 2: AP with DHCP
  {
    id: "v2-1",
    expId: 2,
    expTitle: "02 — CONFIGURE ACCESS POINT WITH DHCP",
    question: "What is the exact sequence of the DHCP 4-way handshake?",
    answer: "D-O-R-A: 1. DHCP Discover (Client broadcast) 2. DHCP Offer (Server unicast/broadcast) 3. DHCP Request (Client broadcast) 4. DHCP Acknowledgment / ACK (Server commits lease).",
    difficulty: "EASY",
    category: "DHCP"
  },
  {
    id: "v2-2",
    expId: 2,
    expTitle: "02 — CONFIGURE ACCESS POINT WITH DHCP",
    question: "Which transport protocol and UDP port numbers does DHCP use?",
    answer: "DHCP uses UDP. The server listens on UDP port 67, and the client listens on UDP port 68.",
    difficulty: "EASY",
    category: "DHCP"
  },
  {
    id: "v2-3",
    expId: 2,
    expTitle: "02 — CONFIGURE ACCESS POINT WITH DHCP",
    question: "What happens if a client's DHCP lease expires and renewal fails?",
    answer: "The client must release its IP address, cease all network communication on that address, and initiate a new DHCP Discover handshake from 0.0.0.0.",
    difficulty: "MEDIUM",
    category: "DHCP"
  },

  // Exp 3: WLC
  {
    id: "v3-1",
    expId: 3,
    expTitle: "03 — CONFIGURE A CENTRALIZED WLC",
    question: "What is the Split-MAC architecture in centralized wireless networks?",
    answer: "It splits 802.11 functions between the AP (real-time tasks like beacon transmission, frame ACK, buffering) and the WLC (non-real-time tasks like association, roaming, security, and policy enforcement).",
    difficulty: "IMPORTANT",
    category: "WLC"
  },
  {
    id: "v3-2",
    expId: 3,
    expTitle: "03 — CONFIGURE A CENTRALIZED WLC",
    question: "What protocol creates the secure tunnel between Lightweight APs and the WLC?",
    answer: "CAPWAP (Control and Provisioning of Wireless Access Points), utilizing UDP port 5246 for Control and 5247 for Data with DTLS encryption.",
    difficulty: "IMPORTANT",
    category: "WLC"
  },
  {
    id: "v3-3",
    expId: 3,
    expTitle: "03 — CONFIGURE A CENTRALIZED WLC",
    question: "How does a Lightweight AP discover its controller automatically?",
    answer: "Using DHCP Option 43, DNS query resolution (e.g. CISCO-CAPWAP-CONTROLLER), local subnet broadcast, or static pre-provisioning.",
    difficulty: "MEDIUM",
    category: "WLC"
  },

  // Exp 4: Server Client Network
  {
    id: "v4-1",
    expId: 4,
    expTitle: "04 — CONFIGURE SERVER AND CLIENT NETWORK",
    question: "What is the primary role of an Address Resolution Protocol (ARP) query?",
    answer: "ARP resolves a known Layer 3 logical IP address into a corresponding physical Layer 2 MAC address on the local broadcast domain.",
    difficulty: "EASY",
    category: "Networking"
  },
  {
    id: "v4-2",
    expId: 4,
    expTitle: "04 — CONFIGURE SERVER AND CLIENT NETWORK",
    question: "What ICMP types are exchanged during a successful Ping command?",
    answer: "ICMP Type 8 (Echo Request) sent by the client, and ICMP Type 0 (Echo Reply) returned by the target host.",
    difficulty: "EASY",
    category: "Networking"
  },
  {
    id: "v4-3",
    expId: 4,
    expTitle: "04 — CONFIGURE SERVER AND CLIENT NETWORK",
    question: "How does a Layer 2 switch differ from a hub in handling client packets?",
    answer: "A hub broadcasts every incoming frame to all ports, causing collisions; a switch maintains a MAC address table (CAM) to forward frames only to the designated recipient port.",
    difficulty: "MEDIUM",
    category: "Networking"
  },

  // Exp 5: RADIUS
  {
    id: "v5-1",
    expId: 5,
    expTitle: "05 — CONFIGURE WLAN + WLC + RADIUS",
    question: "What does AAA stand for in network access security?",
    answer: "Authentication (verifying who you are), Authorization (determining what you can do), and Accounting (tracking what you did).",
    difficulty: "EASY",
    category: "Security"
  },
  {
    id: "v5-2",
    expId: 5,
    expTitle: "05 — CONFIGURE WLAN + WLC + RADIUS",
    question: "What standard port numbers are assigned to RADIUS Authentication and Accounting?",
    answer: "UDP port 1812 for Authentication and UDP port 1813 for Accounting (legacy ports were 1645 and 1646).",
    difficulty: "EASY",
    category: "Security"
  },
  {
    id: "v5-3",
    expId: 5,
    expTitle: "05 — CONFIGURE WLAN + WLC + RADIUS",
    question: "Why is 802.1X Enterprise significantly more secure than WPA2-Personal (PSK)?",
    answer: "In PSK, all users share the same static passphrase; in 802.1X, each user authenticates with unique individual credentials, generating dynamic per-session encryption keys (PMK/PTK).",
    difficulty: "IMPORTANT",
    category: "Security"
  },

  // Exp 6: CDMA
  {
    id: "v6-1",
    expId: 6,
    expTitle: "06 — CDMA",
    question: "What mathematical property enables CDMA receivers to separate overlapping users?",
    answer: "Orthogonality: The inner dot product of any two distinct spreading codes equals zero, while the dot product of a code with itself equals the code length N.",
    difficulty: "IMPORTANT",
    category: "CDMA"
  },
  {
    id: "v6-2",
    expId: 6,
    expTitle: "06 — CDMA",
    question: "What is Processing Gain in CDMA and how is it calculated?",
    answer: "Processing Gain (G) is the factor by which the bandwidth is widened: G = Bandwidth of Spreading Signal (Chip Rate) / Bandwidth of Message Signal (Bit Rate).",
    difficulty: "IMPORTANT",
    category: "CDMA"
  },
  {
    id: "v6-3",
    expId: 6,
    expTitle: "06 — CDMA",
    question: "What is the Near-Far problem in CDMA and how is it addressed?",
    answer: "A mobile device near the cell tower will overpower distant signals if both transmit at the same power. It is solved using ultra-fast closed-loop power control (up to 1500 adjustments/sec).",
    difficulty: "MEDIUM",
    category: "CDMA"
  },

  // Exp 7: AM, FM, PM
  {
    id: "v7-1",
    expId: 7,
    expTitle: "07 — AM, FM, PM",
    question: "Why does overmodulation (μ > 1) cause distortion in Amplitude Modulation?",
    answer: "When μ > 1, the carrier amplitude envelope crosses below the zero axis, causing phase reversals that standard envelope diode detectors cannot rectify without severe distortion.",
    difficulty: "IMPORTANT",
    category: "Modulation"
  },
  {
    id: "v7-2",
    expId: 7,
    expTitle: "07 — AM, FM, PM",
    question: "State Carson's Rule for calculating FM bandwidth.",
    answer: "BW ≈ 2(Δf + fm) = 2(β + 1)fm, where Δf is peak frequency deviation, fm is highest modulating frequency, and β is the modulation index.",
    difficulty: "IMPORTANT",
    category: "Modulation"
  },
  {
    id: "v7-3",
    expId: 7,
    expTitle: "07 — AM, FM, PM",
    question: "What is the key difference between Frequency Modulation (FM) and Phase Modulation (PM)?",
    answer: "In FM, the frequency deviation is proportional to message amplitude. In PM, the frequency deviation is proportional to the time derivative (slope) of the modulating signal.",
    difficulty: "MEDIUM",
    category: "Modulation"
  },

  // Exp 8: BASK, BFSK, BPSK, QPSK
  {
    id: "v8-1",
    expId: 8,
    expTitle: "08 — BASK, BFSK, BPSK AND QPSK",
    question: "How many bits are encoded in one QPSK symbol compared to BPSK?",
    answer: "QPSK encodes 2 bits per symbol (00, 01, 10, 11) using 4 phase states, doubling spectral efficiency compared to BPSK which encodes 1 bit per symbol.",
    difficulty: "IMPORTANT",
    category: "Digital Mod"
  },
  {
    id: "v8-2",
    expId: 8,
    expTitle: "08 — BASK, BFSK, BPSK AND QPSK",
    question: "What are the coordinates of the 4 constellation points in standard QPSK?",
    answer: "(+1/√2, +1/√2), (-1/√2, +1/√2), (-1/√2, -1/√2), and (+1/√2, -1/√2) corresponding to 45°, 135°, 225°, and 315° phase angles.",
    difficulty: "MEDIUM",
    category: "Digital Mod"
  },
  {
    id: "v8-3",
    expId: 8,
    expTitle: "08 — BASK, BFSK, BPSK AND QPSK",
    question: "What is On-Off Keying (OOK)?",
    answer: "OOK is the simplest form of BASK where binary 1 is represented by presence of the carrier wave, and binary 0 by complete carrier absence.",
    difficulty: "EASY",
    category: "Digital Mod"
  },

  // Exp 9: Pulse Modulation
  {
    id: "v9-1",
    expId: 9,
    expTitle: "09 — PULSE MODULATION",
    question: "What parameter of the pulse is varied in PAM, PWM, and PPM?",
    answer: "PAM varies pulse height/amplitude; PWM varies pulse duration/width; PPM varies the time arrival offset relative to an unmodulated clock tick.",
    difficulty: "EASY",
    category: "Pulse Mod"
  },
  {
    id: "v9-2",
    expId: 9,
    expTitle: "09 — PULSE MODULATION",
    question: "State the Nyquist sampling criterion.",
    answer: "To allow exact reconstruction of a bandlimited continuous signal, the sampling frequency fs must be at least twice the highest frequency component fm: fs ≥ 2*fm.",
    difficulty: "IMPORTANT",
    category: "Pulse Mod"
  },
  {
    id: "v9-3",
    expId: 9,
    expTitle: "09 — PULSE MODULATION",
    question: "Why is PWM more immune to channel noise than PAM?",
    answer: "Noise in transmission channels primarily alters pulse amplitude. In PWM, data is encoded in pulse edge timing, so amplitude limiters can clip off noise without damaging information.",
    difficulty: "MEDIUM",
    category: "Pulse Mod"
  },

  // Exp 10: OFDM
  {
    id: "v10-1",
    expId: 10,
    expTitle: "10 — OFDM",
    question: "What mathematical property makes OFDM subcarriers orthogonal?",
    answer: "The subcarrier frequency spacing is set to Δf = 1/Ts. The peak of each subcarrier's sinc spectrum aligns exactly with the nulls (zero-crossings) of all other subcarriers.",
    difficulty: "IMPORTANT",
    category: "OFDM"
  },
  {
    id: "v10-2",
    expId: 10,
    expTitle: "10 — OFDM",
    question: "What is the purpose of the Cyclic Prefix (CP) in an OFDM symbol?",
    answer: "The CP acts as a guard interval that prevents Inter-Symbol Interference (ISI) from multipath delay spread and converts linear channel convolution into circular convolution.",
    difficulty: "IMPORTANT",
    category: "OFDM"
  },
  {
    id: "v10-3",
    expId: 10,
    expTitle: "10 — OFDM",
    question: "What is PAPR in OFDM systems?",
    answer: "Peak-to-Average Power Ratio: when multiple subcarriers add in phase, the instantaneous peak power is much higher than the average, requiring high-dynamic-range linear RF amplifiers.",
    difficulty: "MEDIUM",
    category: "OFDM"
  },

  // Exp 11: Wi-Fi Scanner
  {
    id: "v11-1",
    expId: 11,
    expTitle: "11 — WI-FI SCANNER",
    question: "What does RSSI stand for and what is its typical range?",
    answer: "Received Signal Strength Indicator; measured in negative dBm, typically ranging from -30 dBm (excellent signal close to AP) to -90 dBm (weak signal near disconnection).",
    difficulty: "EASY",
    category: "Wi-Fi Analysis"
  },
  {
    id: "v11-2",
    expId: 11,
    expTitle: "11 — WI-FI SCANNER",
    question: "What is the difference between active and passive wireless scanning?",
    answer: "Passive scanning only listens for periodic 802.11 Beacon frames sent by APs. Active scanning transmits Probe Requests on each channel and waits for Probe Responses.",
    difficulty: "IMPORTANT",
    category: "Wi-Fi Analysis"
  },
  {
    id: "v11-3",
    expId: 11,
    expTitle: "11 — WI-FI SCANNER",
    question: "What information does a Wi-Fi scanner extract from a beacon frame?",
    answer: "SSID name, BSSID (AP MAC address), supported channels, current operating channel, RSSI power, supported data rates, and supported security suites (WPA2/WPA3).",
    difficulty: "MEDIUM",
    category: "Wi-Fi Analysis"
  },

  // Exp 12: Wi-Fi Analyzer
  {
    id: "v12-1",
    expId: 12,
    expTitle: "12 — WI-FI ANALYZER",
    question: "Which channels are completely non-overlapping in the 2.4 GHz Wi-Fi spectrum?",
    answer: "Channels 1, 6, and 11 (separated by 25 MHz between center frequencies while each channel spans 20-22 MHz).",
    difficulty: "IMPORTANT",
    category: "Wi-Fi Analysis"
  },
  {
    id: "v12-2",
    expId: 12,
    expTitle: "12 — WI-FI ANALYZER",
    question: "Why is Adjacent Channel Interference (ACI) more damaging than Co-Channel Interference (CCI)?",
    answer: "With CCI, APs and stations use CSMA/CA to share the medium politely. With ACI, overlapping transmissions appear as un-decodable RF noise, corrupting packets and forcing collisions.",
    difficulty: "IMPORTANT",
    category: "Wi-Fi Analysis"
  },
  {
    id: "v12-3",
    expId: 12,
    expTitle: "12 — WI-FI ANALYZER",
    question: "How many non-overlapping 20 MHz channels are available in the 5 GHz band?",
    answer: "At least 24 non-overlapping 20 MHz channels across UNII-1, UNII-2, UNII-2 Extended, and UNII-3 bands.",
    difficulty: "MEDIUM",
    category: "Wi-Fi Analysis"
  },

  // Exp 13: TCP/UDP
  {
    id: "v13-1",
    expId: 13,
    expTitle: "13 — LAN TCP/UDP COMMUNICATION",
    question: "What are the 3 flags and packets in the TCP 3-way handshake?",
    answer: "1. Client -> Server: SYN (seq=x) 2. Server -> Client: SYN + ACK (seq=y, ack=x+1) 3. Client -> Server: ACK (ack=y+1).",
    difficulty: "IMPORTANT",
    category: "Protocols"
  },
  {
    id: "v13-2",
    expId: 13,
    expTitle: "13 — LAN TCP/UDP COMMUNICATION",
    question: "What is the size of the UDP header versus the default TCP header?",
    answer: "UDP header is fixed at 8 bytes (Source Port, Dest Port, Length, Checksum). TCP header is 20 bytes (without optional fields).",
    difficulty: "EASY",
    category: "Protocols"
  },
  {
    id: "v13-3",
    expId: 13,
    expTitle: "13 — LAN TCP/UDP COMMUNICATION",
    question: "Why do DNS queries and VoIP commonly utilize UDP instead of TCP?",
    answer: "DNS queries require rapid single-request/single-reply with minimal latency; VoIP prioritizes real-time delivery over late retransmitted packets that would disrupt conversation.",
    difficulty: "MEDIUM",
    category: "Protocols"
  },

  // Exp 14: Beacon Frame Analysis
  {
    id: "v14-1",
    expId: 14,
    expTitle: "14 — BEACON FRAME CAPTURE AND ANALYSIS",
    question: "What are the Type and Subtype bits for an 802.11 Beacon frame?",
    answer: "Frame Type: 00 (Management); Subtype: 1000 (Beacon, hex 0x08).",
    difficulty: "IMPORTANT",
    category: "Frame Analysis"
  },
  {
    id: "v14-2",
    expId: 14,
    expTitle: "14 — BEACON FRAME CAPTURE AND ANALYSIS",
    question: "What is an Information Element (IE) in an 802.11 management frame?",
    answer: "A variable-length TLV (Type-Length-Value) field in the frame body. Common IEs are SSID (Tag 0), Supported Rates (Tag 1), and RSN Security (Tag 48).",
    difficulty: "IMPORTANT",
    category: "Frame Analysis"
  },
  {
    id: "v14-3",
    expId: 14,
    expTitle: "14 — BEACON FRAME CAPTURE AND ANALYSIS",
    question: "What is the standard Beacon Interval duration?",
    answer: "100 Time Units (TU). Since 1 TU = 1024 microseconds, 100 TU ≈ 102.4 milliseconds.",
    difficulty: "MEDIUM",
    category: "Frame Analysis"
  },

  // Exp 15: WLAN Security Report
  {
    id: "v15-1",
    expId: 15,
    expTitle: "15 — WLAN SECURITY REPORT",
    question: "What makes WPA3-Personal immune to offline dictionary attacks?",
    answer: "WPA3 replaces the 4-way PSK handshake with Simultaneous Authentication of Equals (SAE) / Dragonfly, a zero-knowledge proof where passwords cannot be tested offline against captured handshakes.",
    difficulty: "IMPORTANT",
    category: "Security"
  },
  {
    id: "v15-2",
    expId: 15,
    expTitle: "15 — WLAN SECURITY REPORT",
    question: "What vulnerability is introduced when Wi-Fi Protected Setup (WPS) is enabled?",
    answer: "WPS PIN verification checks the 8-digit PIN in two separate halves (4 digits and 3 digits + checksum), reducing brute-force attempts from 10^8 to just 11,000 guesses.",
    difficulty: "IMPORTANT",
    category: "Security"
  },
  {
    id: "v15-3",
    expId: 15,
    expTitle: "15 — WLAN SECURITY REPORT",
    question: "What does 802.11w Protected Management Frames (PMF) protect against?",
    answer: "PMF encrypts and signs management frames (Deauth, Disassoc), preventing attackers from spoofing deauthentication frames to disconnect wireless users.",
    difficulty: "MEDIUM",
    category: "Security"
  },

  // Exp 16: Bluetooth Discovery
  {
    id: "v16-1",
    expId: 16,
    expTitle: "16 — BLUETOOTH DISCOVERY",
    question: "What are the three primary BLE advertising channels and why were they chosen?",
    answer: "Channels 37 (2402 MHz), 38 (2426 MHz), and 39 (2480 MHz). They are spaced to sit comfortably between non-overlapping Wi-Fi channels 1, 6, and 11 to avoid interference.",
    difficulty: "IMPORTANT",
    category: "Bluetooth"
  },
  {
    id: "v16-2",
    expId: 16,
    expTitle: "16 — BLUETOOTH DISCOVERY",
    question: "What is the structure and length of a Bluetooth BD_ADDR?",
    answer: "48 bits (6 bytes) represented in hex (e.g. AA:BB:CC:DD:EE:FF). It is split into NAP (Non-significant), UAP (Upper), and LAP (Lower Address Part).",
    difficulty: "EASY",
    category: "Bluetooth"
  },
  {
    id: "v16-3",
    expId: 16,
    expTitle: "16 — BLUETOOTH DISCOVERY",
    question: "What is an FHS packet in Bluetooth Classic discovery?",
    answer: "Frequency Hopping Synchronization packet; sent by a discoverable device responding to an inquiry, containing its clock offset, BD_ADDR, and Class of Device.",
    difficulty: "MEDIUM",
    category: "Bluetooth"
  },

  // Exp 17: Bluetooth Device Details
  {
    id: "v17-1",
    expId: 17,
    expTitle: "17 — BLUETOOTH DEVICE DETAILS",
    question: "Explain the hierarchy of GATT in Bluetooth Low Energy.",
    answer: "Profile -> Services (collection of related characteristics) -> Characteristics (contain user values) -> Descriptors (metadata/configuration like CCCD).",
    difficulty: "IMPORTANT",
    category: "Bluetooth"
  },
  {
    id: "v17-2",
    expId: 17,
    expTitle: "17 — BLUETOOTH DEVICE DETAILS",
    question: "What is the standard 16-bit UUID for the Battery Service and Heart Rate Service?",
    answer: "Battery Service: 0x180F; Heart Rate Service: 0x180D.",
    difficulty: "MEDIUM",
    category: "Bluetooth"
  },
  {
    id: "v17-3",
    expId: 17,
    expTitle: "17 — BLUETOOTH DEVICE DETAILS",
    question: "What major improvements were introduced in Bluetooth 5.0 over Bluetooth 4.2?",
    answer: "2x speed (2 Mbps PHY), 4x long range (LE Coded PHY), and 8x broadcast message capacity (advertising extensions).",
    difficulty: "IMPORTANT",
    category: "Bluetooth"
  },

  // Exp 18: Bluetooth Chat
  {
    id: "v18-1",
    expId: 18,
    expTitle: "18 — BLUETOOTH CHAT",
    question: "What is the role of RFCOMM in Bluetooth chat applications?",
    answer: "RFCOMM provides reliable serial port emulation (RS-232) over L2CAP, enabling line-oriented text and byte stream transmission between two paired devices.",
    difficulty: "IMPORTANT",
    category: "Bluetooth"
  },
  {
    id: "v18-2",
    expId: 18,
    expTitle: "18 — BLUETOOTH CHAT",
    question: "What is the maximum number of active slave devices in a Bluetooth Piconet?",
    answer: "Up to 7 active slave devices can simultaneously communicate with 1 master in a single piconet (up to 255 parked devices).",
    difficulty: "EASY",
    category: "Bluetooth"
  },
  {
    id: "v18-3",
    expId: 18,
    expTitle: "18 — BLUETOOTH CHAT",
    question: "What frequency hopping scheme does Bluetooth use to resist interference?",
    answer: "AFH (Adaptive Frequency Hopping) hopping across 79 channels at 1600 hops/sec, dynamically avoiding frequencies crowded by active Wi-Fi networks.",
    difficulty: "MEDIUM",
    category: "Bluetooth"
  },

  // Exp 19: Bluetooth File Transfer
  {
    id: "v19-1",
    expId: 19,
    expTitle: "19 — BLUETOOTH FILE TRANSFER",
    question: "What is OBEX and which Bluetooth profile handles file transfer?",
    answer: "OBEX (Object Exchange) is a binary object protocol. The Object Push Profile (OPP) or File Transfer Profile (FTP) utilizes OBEX over RFCOMM to transfer files.",
    difficulty: "IMPORTANT",
    category: "Bluetooth"
  },
  {
    id: "v19-2",
    expId: 19,
    expTitle: "19 — BLUETOOTH FILE TRANSFER",
    question: "Why is Bluetooth file transfer slower than Wi-Fi Direct file sharing?",
    answer: "Bluetooth Classic EDR is capped at a 2.1-3 Mbps physical link (effective ~200 KB/s) due to frequency hopping and small MTUs, whereas Wi-Fi Direct uses wide channels delivering 50-300+ Mbps.",
    difficulty: "IMPORTANT",
    category: "Bluetooth"
  },
  {
    id: "v19-3",
    expId: 19,
    expTitle: "19 — BLUETOOTH FILE TRANSFER",
    question: "What are the primary OBEX header fields transmitted before data chunks?",
    answer: "Name (0x01, target filename), Length (0xC3, total file size in bytes), and Type (0x42, MIME media type).",
    difficulty: "MEDIUM",
    category: "Bluetooth"
  }
];
