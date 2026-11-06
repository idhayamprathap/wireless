// Complete dataset for all 19 Wireless Communication Experiments
export const EXPERIMENTS = [
  {
    id: 1,
    number: "01",
    title: "WIRELESS LAN (WLAN)",
    category: "WLAN & Infrastructure",
    difficulty: "Beginner",
    estimatedTime: "30 mins",
    shortDesc: "Understand fundamental WLAN architecture, IEEE 802.11 standards, components, SSID, IP addressing, and packet routing.",
    aim: "To study the architecture, fundamental components, topological structure, and communication mechanism of an IEEE 802.11 Wireless Local Area Network (WLAN).",
    requirements: [
      "Simulated Wireless Client (Laptop/Station)",
      "Simulated Access Point (AP) supporting 802.11a/b/g/n/ac",
      "Broadband Gateway / Router",
      "Simulated Cloud WAN / Internet Node",
      "Network Interface Controller (NIC) 802.11 compliant"
    ],
    theory: {
      overview: "A Wireless Local Area Network (WLAN) is a wireless computer network that links two or more devices using high-frequency radio waves within a limited area such as a home, school, computer laboratory, or office building. It operates under the IEEE 802.11 family of specifications.",
      keyPoints: [
        "What is WLAN?: An over-the-air transmission system using RF technology (2.4 GHz, 5 GHz, 6 GHz bands) to replace copper twisted-pair cabling.",
        "Why WLAN is used?: Mobility, flexibility, ease of deployment, reduced installation cost, scalability, and broad device interoperability.",
        "WLAN Components: Station (STA), Access Point (AP), Basic Service Set (BSS), Extended Service Set (ESS), Distribution System (DS), and Gateway Router.",
        "SSID (Service Set Identifier): A 32-character alphanumeric label uniquely identifying an 802.11 wireless network broadcasted in beacon frames.",
        "Wireless Communication: Half-duplex RF propagation utilizing CSMA/CA (Carrier Sense Multiple Access with Collision Avoidance) to coordinate channel access.",
        "IP Addressing & DHCP: Wireless stations obtain layer 3 logical parameters (IP address, Subnet Mask, Gateway, DNS) automatically via DHCP.",
        "WLAN Topology: Infrastructure mode (BSS with central AP) vs Ad-Hoc mode (IBSS peer-to-peer without AP)."
      ],
      standards: [
        { std: "802.11b", freq: "2.4 GHz", maxRate: "11 Mbps", modulation: "DSSS / CCK" },
        { std: "802.11g", freq: "2.4 GHz", maxRate: "54 Mbps", modulation: "OFDM" },
        { std: "802.11n (Wi-Fi 4)", freq: "2.4 / 5 GHz", maxRate: "600 Mbps", modulation: "MIMO-OFDM" },
        { std: "802.11ac (Wi-Fi 5)", freq: "5 GHz", maxRate: "6.9 Gbps", modulation: "256-QAM MU-MIMO" },
        { std: "802.11ax (Wi-Fi 6)", freq: "2.4 / 5 / 6 GHz", maxRate: "9.6 Gbps", modulation: "1024-QAM OFDMA" }
      ]
    },
    topology: {
      type: "Infrastructure BSS",
      nodes: [
        { id: "laptop", name: "Wireless Client", ip: "192.168.1.105", mac: "00:1A:2B:3C:4D:5E", desc: "Generates user traffic, handles 802.11 association and WPA2/WPA3 key negotiation." },
        { id: "ap", name: "Access Point (AP)", ip: "192.168.1.1", mac: "00:14:22:01:23:45", desc: "Bridges 802.11 RF wireless frames to 802.3 Ethernet frames; broadcasts beacon frames." },
        { id: "router", name: "Core Router / Gateway", ip: "192.168.1.254", mac: "00:0C:29:4F:88:11", desc: "Performs Layer 3 IP routing, NAT translation, and default gateway services." },
        { id: "internet", name: "WAN / Internet", ip: "8.8.8.8", mac: "N/A", desc: "Upstream destination network and DNS resolver." }
      ],
      flow: ["Wireless Client", "RF Signal (2.4/5GHz)", "Access Point", "802.3 Ethernet", "Core Router", "Fiber WAN", "Internet Cloud"]
    },
    procedure: [
      "Power on the simulated wireless client station and access point.",
      "Inspect the wireless environment by scanning for available Service Set Identifiers (SSIDs).",
      "Observe the 802.11 probe request and probe response handshake between Client and AP.",
      "Initiate authentication and 4-way association handshake to establish wireless link layer.",
      "Verify that the AP bridges 802.11 wireless frames into 802.3 Ethernet frames toward the switch/router.",
      "Inspect IP addressing parameters allocated to the wireless client station.",
      "Execute an end-to-end packet transmission from the client station to the upstream Internet gateway.",
      "Verify packet round-trip time and frame status."
    ],
    configuration: {
      ssid: "Campus_Secure_WiFi",
      band: "2.4 GHz",
      channel: 6,
      security: "WPA2-Personal (AES)",
      clientIp: "192.168.1.105",
      gateway: "192.168.1.1",
      dns: "8.8.8.8"
    },
    expectedOutput: "The client establishes a stable wireless association with the Access Point, receives an IP from subnet 192.168.1.0/24, and achieves 0% packet loss toward the core gateway.",
    result: "Successfully analyzed WLAN architecture, infrastructure topology, component functions, and verified end-to-end packet flow over IEEE 802.11 wireless links.",
    viva: [
      { q: "What is an SSID?", a: "SSID (Service Set Identifier) is a unique 32-byte alphanumeric identifier used to name an 802.11 wireless network.", diff: "EASY" },
      { q: "Why does 802.11 WLAN use CSMA/CA instead of CSMA/CD?", a: "Wireless stations cannot detect collisions while transmitting because their own transmission overwhelms the receiver (Hidden Node problem). Thus, they use collision avoidance with random backoff.", diff: "IMPORTANT" },
      { q: "What is the primary function of an Access Point in Infrastructure mode?", a: "It acts as a central base station and bridges 802.11 wireless radio frames with 802.3 wired Ethernet frames.", diff: "MEDIUM" },
      { q: "What are the unlicensed frequency bands commonly used by WLAN?", a: "The ISM bands: 2.4 GHz (2.400 - 2.4835 GHz), 5 GHz (UNII bands), and 6 GHz (Wi-Fi 6E).", diff: "EASY" }
    ]
  },
  {
    id: 2,
    number: "02",
    title: "CONFIGURE ACCESS POINT WITH DHCP",
    category: "WLAN & Infrastructure",
    difficulty: "Beginner",
    estimatedTime: "35 mins",
    shortDesc: "Configure an Autonomous Access Point with custom SSID, subnet parameters, and DHCP IP address pool allocation.",
    aim: "To configure a standalone Wireless Access Point with custom SSID, secure channel, and an integrated Dynamic Host Configuration Protocol (DHCP) server pool.",
    requirements: [
      "Simulated Wireless Access Point with embedded DHCP Server",
      "Simulated Wireless Laptop Client",
      "Web Management Console / CLI Simulator",
      "DHCP Packet Analyzer engine (UDP ports 67/68)"
    ],
    theory: {
      overview: "Dynamic Host Configuration Protocol (DHCP) operates at the application layer of the OSI model using UDP ports 67 (server) and 68 (client). It automates network parameter assignment to connecting wireless clients without manual intervention.",
      keyPoints: [
        "DHCP Discover: Client broadcasts a discovery frame to find available DHCP servers (Src: 0.0.0.0, Dst: 255.255.255.255).",
        "DHCP Offer: The Access Point server reserves an unassigned IP and unicasts/broadcasts an offer with subnet mask, lease duration, and gateway.",
        "DHCP Request: Client formally accepts the offered IP address and broadcasts its request.",
        "DHCP Acknowledgment (ACK): Server commits the binding into its lease table and acknowledges the client.",
        "Lease Management: AP tracks MAC-to-IP bindings to avoid duplicate address conflicts in the wireless subnet."
      ],
      standards: [
        { std: "RFC 2131", freq: "UDP 67/68", maxRate: "N/A", modulation: "Application Layer DHCP" }
      ]
    },
    topology: {
      type: "Autonomous AP with DHCP Service",
      nodes: [
        { id: "laptop", name: "Laptop Client", ip: "0.0.0.0 -> 192.168.10.100", mac: "54:E1:AD:12:34:56", desc: "DHCP Client awaiting IP allocation." },
        { id: "ap", name: "AP-DHCP-Server", ip: "192.168.10.1", mac: "CC:2D:E0:AA:BB:CC", desc: "Autonomous AP hosting DHCP Scope 192.168.10.100 - 192.168.10.200." }
      ],
      flow: ["Laptop (0.0.0.0)", "DHCP DISCOVER (Broadcast)", "AP Server", "DHCP OFFER (192.168.10.100)", "Laptop", "DHCP REQUEST", "AP Server", "DHCP ACK", "Laptop (192.168.10.100 Bound)"]
    },
    procedure: [
      "Access the Access Point web-based configuration portal.",
      "Assign the wireless network name (SSID) e.g., 'College_WiFi'.",
      "Configure the AP Management IP (192.168.10.1) and Subnet Mask (255.255.255.0).",
      "Enable the internal DHCP service module.",
      "Specify the DHCP Start IP (192.168.10.100) and End IP (192.168.10.200).",
      "Configure Default Gateway (192.168.10.1) and DNS IP (8.8.8.8).",
      "Save and commit configuration to the Access Point NVRAM.",
      "Connect the simulated laptop client and trigger DORA handshake sequence.",
      "Verify lease assignment and IP binding in the AP client table."
    ],
    configuration: {
      ssid: "College_WiFi",
      ipAddress: "192.168.10.1",
      subnetMask: "255.255.255.0",
      defaultGateway: "192.168.10.1",
      dhcpStart: "192.168.10.100",
      dhcpEnd: "192.168.10.200",
      dnsServer: "8.8.8.8",
      leaseTimeHours: 24
    },
    expectedOutput: "The Access Point initializes the DHCP service pool. The wireless laptop triggers the 4-way DORA sequence and successfully secures IP 192.168.10.100.",
    result: "Successfully configured an autonomous Access Point with DHCP server pool and validated automatic IP parameter distribution via the DORA transaction.",
    viva: [
      { q: "What does the acronym DORA stand for in DHCP?", a: "Discover, Offer, Request, and Acknowledgment.", diff: "EASY" },
      { q: "Which transport protocol and port numbers are used by DHCP?", a: "UDP; Server listens on port 67, and client listens on port 68.", diff: "EASY" },
      { q: "What happens when the DHCP lease expires?", a: "The client must send a DHCP Request to renew the lease; if unacknowledged, it reverts to requesting a new lease.", diff: "MEDIUM" },
      { q: "What is the purpose of the DHCP Default Gateway field?", a: "It tells the client where to send packets whose destination IP lies outside the local subnet.", diff: "MEDIUM" }
    ]
  },
  {
    id: 3,
    number: "03",
    title: "CONFIGURE A CENTRALIZED WIRELESS LAN CONTROLLER",
    category: "WLAN & Infrastructure",
    difficulty: "Intermediate",
    estimatedTime: "45 mins",
    shortDesc: "Simulate enterprise centralized Wi-Fi using a Wireless LAN Controller (WLC) managing lightweight Access Points (LAPs).",
    aim: "To configure a centralized Wireless LAN Controller (WLC), establish CAPWAP tunnels with Lightweight Access Points (LAPs), and deploy centralized WLAN SSIDs.",
    requirements: [
      "Simulated Wireless LAN Controller (WLC)",
      "3x Lightweight Access Points (AP-1, AP-2, AP-3)",
      "Core Distribution Switch",
      "VLAN Trunking and CAPWAP Tunnel protocol engine"
    ],
    theory: {
      overview: "In modern enterprise wireless networks, autonomous fat APs are replaced by Lightweight Access Points (LAPs) orchestrated by a centralized Wireless LAN Controller (WLC) via CAPWAP (Control and Provisioning of Wireless Access Points).",
      keyPoints: [
        "Split-MAC Architecture: Real-time MAC functions (beacon transmission, frame ACK, buffering) remain on the LAP; non-real-time MAC (authentication, association, roaming, security policy) reside on the WLC.",
        "CAPWAP Protocol: Uses UDP ports 5246 (Control) and 5247 (Data) with DTLS encryption for secure central management.",
        "Centralized VLAN Mapping: SSIDs created on the WLC are mapped to 802.1Q tagged VLANs and trunked directly to the core switch.",
        "Zero-Touch AP Provisioning: LAPs discover the WLC via DHCP Option 43 or DNS, download firmware, and adopt configurations automatically."
      ],
      standards: [
        { std: "RFC 5415 / 5416", freq: "CAPWAP", maxRate: "Enterprise Scale", modulation: "Split-MAC Controller" }
      ]
    },
    topology: {
      type: "Split-MAC Centralized Controller",
      nodes: [
        { id: "ap1", name: "LAP-Floor-1", ip: "192.168.20.101", mac: "00:2A:10:01:00:01", desc: "Lightweight AP joined to WLC via CAPWAP tunnel." },
        { id: "ap2", name: "LAP-Floor-2", ip: "192.168.20.102", mac: "00:2A:10:01:00:02", desc: "Lightweight AP joined to WLC via CAPWAP tunnel." },
        { id: "ap3", name: "LAP-Floor-3", ip: "192.168.20.103", mac: "00:2A:10:01:00:03", desc: "Lightweight AP joined to WLC via CAPWAP tunnel." },
        { id: "wlc", name: "WLC-LAB", ip: "192.168.20.10", mac: "00:3B:55:W1:C0:00", desc: "Centralized WLC managing RF, radio parameters, and VLAN routing." },
        { id: "network", name: "Enterprise Core Switch", ip: "192.168.20.1", mac: "00:00:5E:00:01:01", desc: "Trunking VLAN 20 and routing traffic." }
      ],
      flow: ["LAPs (AP1, AP2, AP3)", "CAPWAP Discovery Request", "WLC-LAB", "CAPWAP Join Accept", "Config Pushed to LAPs", "SSID Broadcasted Across All Floors"]
    },
    procedure: [
      "Access the WLC management console and assign Controller Name 'WLC-LAB'.",
      "Configure the management interface IP (192.168.20.10/24) and default gateway.",
      "Define wireless service SSID 'College_WLAN' mapped to VLAN 20.",
      "Initiate CAPWAP Discovery from LAPs (AP1, AP2, AP3) toward WLC IP.",
      "Verify CAPWAP tunnel handshake and observe status transition to 'Registered'.",
      "Push global radio frequency (RF) parameters and power levels from WLC to all LAPs.",
      "Confirm unified WLAN broadcast across all three access points."
    ],
    configuration: {
      wlcName: "WLC-LAB",
      managementIp: "192.168.20.10",
      subnetMask: "255.255.255.0",
      gateway: "192.168.20.1",
      ssid: "College_WLAN",
      vlanId: 20,
      security: "WPA2-Enterprise / PSK",
      rfBand: "Dual-Band 2.4 / 5 GHz"
    },
    expectedOutput: "All 3 Lightweight APs establish DTLS/CAPWAP tunnels with WLC-LAB, transition to 'Registered' status, and broadcast 'College_WLAN' on VLAN 20.",
    result: "Successfully deployed and verified enterprise centralized WLAN control architecture using WLC and Lightweight Access Points.",
    viva: [
      { q: "What is Split-MAC architecture?", a: "A design dividing 802.11 MAC functions: real-time tasks on the AP, and management/authentication tasks on the central WLC.", diff: "IMPORTANT" },
      { q: "What protocol is used for communication between AP and WLC?", a: "CAPWAP (Control and Provisioning of Wireless Access Points), using UDP ports 5246 and 5247.", diff: "IMPORTANT" },
      { q: "What are the advantages of WLC over Autonomous APs?", a: "Centralized management, seamless roaming, dynamic RF auto-tuning, bulk firmware updates, and unified security policies.", diff: "MEDIUM" },
      { q: "How does a Lightweight AP locate a WLC?", a: "Via DHCP Option 43, DNS query (cisco-capwap-controller), local broadcast, or preconfigured static IP.", diff: "MEDIUM" }
    ]
  },
  {
    id: 4,
    number: "04",
    title: "CONFIGURE SERVER AND CLIENT NETWORK",
    category: "WLAN & Infrastructure",
    difficulty: "Beginner",
    estimatedTime: "30 mins",
    shortDesc: "Build and test a multi-client local server network topology with switch aggregation and ICMP connectivity analysis.",
    aim: "To configure a client-server local network architecture with static IP addressing, default gateway routing, and verify end-to-end connectivity using ICMP Ping.",
    requirements: [
      "Simulated Central Enterprise Server",
      "Layer 2 Managed Ethernet Switch",
      "3x Workstation Clients (PC1, PC2, PC3)",
      "ICMP / ARP Packet Generation Engine"
    ],
    theory: {
      overview: "A Client-Server network architecture divides workloads between service providers (servers) and service requesters (clients). Layer 2 Ethernet switches forward frames based on MAC addresses, while Layer 3 IP routing enables inter-network transport.",
      keyPoints: [
        "Client-Server Paradigm: Centralized resource sharing, high availability, centralized data backup, and fine-grained access control.",
        "Ethernet Switch Operation: Learns MAC addresses into a CAM table via source MAC sniffing; forwards unicast frames to specific ports.",
        "Address Resolution Protocol (ARP): Resolves Layer 3 IP addresses into Layer 2 physical MAC addresses.",
        "Internet Control Message Protocol (ICMP): Diagnostic protocol used by the `ping` utility with Type 8 (Echo Request) and Type 0 (Echo Reply)."
      ],
      standards: [
        { std: "IEEE 802.3", freq: "Baseband Ethernet", maxRate: "1 Gbps", modulation: "PAM-5 / 1000BASE-T" }
      ]
    },
    topology: {
      type: "Star Topology Client-Server",
      nodes: [
        { id: "server", name: "Central Server", ip: "192.168.30.10", mac: "00:50:56:FE:10:01", desc: "Hosts database and web services." },
        { id: "switch", name: "FastEthernet Switch", ip: "Unmanaged L2", mac: "00:1E:F7:88:99:00", desc: "24-port switch forwarding unicast frames." },
        { id: "pc1", name: "Client PC1", ip: "192.168.30.11", mac: "00:15:5D:01:A1:01", desc: "Workstation terminal 1." },
        { id: "pc2", name: "Client PC2", ip: "192.168.30.12", mac: "00:15:5D:01:A1:02", desc: "Workstation terminal 2." },
        { id: "pc3", name: "Client PC3", ip: "192.168.30.13", mac: "00:15:5D:01:A1:03", desc: "Workstation terminal 3." }
      ],
      flow: ["PC1 / PC2 / PC3", "FastEthernet Link", "Switch Port", "Server Port", "Central Server (192.168.30.10)"]
    },
    procedure: [
      "Assign static IP 192.168.30.10 and subnet mask 255.255.255.0 to Central Server.",
      "Configure PC1 with IP 192.168.30.11, PC2 with 192.168.30.12, and PC3 with 192.168.30.13.",
      "Connect all client workstations and server to the virtual Layer 2 switch.",
      "Trigger ARP resolution to populate the switch CAM table.",
      "Initiate ICMP Ping test from PC1 to Server (192.168.30.10).",
      "Observe ICMP Echo Request and Echo Reply round-trip animation.",
      "Verify 0% packet loss and round-trip delay metrics."
    ],
    configuration: {
      serverIp: "192.168.30.10",
      subnetMask: "255.255.255.0",
      clients: [
        { name: "PC1", ip: "192.168.30.11" },
        { name: "PC2", ip: "192.168.30.12" },
        { name: "PC3", ip: "192.168.30.13" }
      ],
      pingPacketSize: "32 bytes",
      pingCount: 4
    },
    expectedOutput: "All clients reply with 0% packet loss to ICMP Echo Requests: 4 packets transmitted, 4 received, RTT min/avg/max = 1.2/1.8/2.4 ms.",
    result: "Successfully configured client-server network topology and confirmed Layer 2/3 connectivity through animated ICMP packet ping tests.",
    viva: [
      { q: "What is the purpose of ICMP in computer networking?", a: "ICMP provides network error reporting, diagnostic capabilities, and path reachability testing (Ping / Traceroute).", diff: "EASY" },
      { q: "What does the Ping command measure?", a: "Round-Trip Time (RTT) and packet loss percentage between two endpoints.", diff: "EASY" },
      { q: "What is the role of ARP in a client-server local network?", a: "It maps known Layer 3 IP addresses to physical Layer 2 MAC addresses on the local link.", diff: "MEDIUM" }
    ]
  },
  {
    id: 5,
    number: "05",
    title: "CONFIGURE WLAN + WLC + RADIUS",
    category: "Wi-Fi Scanning & Security",
    difficulty: "Advanced",
    estimatedTime: "50 mins",
    shortDesc: "Simulate enterprise 802.1X EAP authentication integrating Wireless Clients, Lightweight AP, WLC, and external RADIUS server.",
    aim: "To implement IEEE 802.1X Enterprise Wireless Authentication utilizing a centralized Wireless LAN Controller (WLC) and Remote Authentication Dial-In User Service (RADIUS) Server.",
    requirements: [
      "Simulated Enterprise Wireless Client (Supplicant)",
      "Lightweight Access Point (Authenticator)",
      "Centralized WLC Controller",
      "External RADIUS Server (Authentication Server, UDP 1812/1813)",
      "EAP-TLS / PEAP-MSCHAPv2 protocol simulator"
    ],
    theory: {
      overview: "IEEE 802.1X provides port-based network access control. In an enterprise WLAN, pre-shared keys are replaced by individual user credentials or certificates validated against a centralized RADIUS / AAA server.",
      keyPoints: [
        "Supplicant (Client): The user device requesting access and presenting credentials via EAP (Extensible Authentication Protocol).",
        "Authenticator (AP / WLC): Enforces access control; blocks unauthorized traffic until RADIUS server issues an Access-Accept packet.",
        "Authentication Server (RADIUS): Checks user database, validates password/certificate, and returns cryptographic session keys (MSK).",
        "RADIUS Protocol: Uses UDP port 1812 for Authentication and port 1813 for Accounting; packets are protected by a pre-shared secret."
      ],
      standards: [
        { std: "IEEE 802.1X", freq: "Port-Based NAC", maxRate: "Enterprise Security", modulation: "EAP-PEAP / TLS" },
        { std: "RFC 2865", freq: "RADIUS Auth", maxRate: "UDP 1812", modulation: "AAA Authentication" }
      ]
    },
    topology: {
      type: "802.1X EAP Enterprise Topology",
      nodes: [
        { id: "supplicant", name: "Enterprise Client", ip: "DHCP Pending", mac: "A4:C3:F0:11:22:33", desc: "Supplicant sending EAP-Response Identity." },
        { id: "ap", name: "Lightweight AP", ip: "192.168.40.100", mac: "00:2B:67:88:99:00", desc: "Encapsulates EAP over Wireless (EAPOL)." },
        { id: "wlc", name: "WLC Controller", ip: "192.168.40.20", mac: "00:3B:55:W1:C0:00", desc: "Translates EAPOL into RADIUS Access-Request UDP packets." },
        { id: "radius", name: "RADIUS Server", ip: "192.168.40.10", mac: "00:50:56:A0:12:34", desc: "Validates user database and returns Access-Accept." }
      ],
      flow: ["Supplicant", "EAPOL-Start", "LAP / WLC", "RADIUS Access-Request (UDP 1812)", "RADIUS Server", "RADIUS Access-Accept", "WLC", "EAP-Success", "Port Opened / Access Granted"]
    },
    procedure: [
      "Configure WLC management IP: 192.168.40.20 and define Enterprise SSID 'Secure_WLAN'.",
      "Set Security Mode to 'WPA2-Enterprise' with 802.1X authentication key management.",
      "Add RADIUS Server IP: 192.168.40.10, Auth Port: 1812, and configure Shared Secret 'RadiusKey@2026'.",
      "Configure user credentials on simulated RADIUS database (e.g., student_admin / Pass#2026).",
      "Initiate connection from Supplicant client with credentials.",
      "Observe 802.1X negotiation: EAPOL-Start -> EAP-Request/Identity -> RADIUS Access-Request -> Access-Accept.",
      "Verify port unblocking and 4-way handshake key installation."
    ],
    configuration: {
      ssid: "Secure_WLAN",
      vlanId: 40,
      wlcIp: "192.168.40.20",
      radiusServerIp: "192.168.40.10",
      authPort: 1812,
      acctPort: 1813,
      sharedSecret: "RadiusKey@2026",
      authMethod: "PEAP-MSCHAPv2"
    },
    expectedOutput: "RADIUS Server validates credentials, returns RADIUS Access-Accept, WLC delivers EAP-Success, and the client displays 'Authentication Successful - Access Granted'.",
    result: "Successfully demonstrated centralized enterprise 802.1X wireless authentication integrating Supplicant, LAP, WLC, and RADIUS AAA server.",
    viva: [
      { q: "What are the three core entities in an 802.1X framework?", a: "Supplicant (client device), Authenticator (WLC / AP), and Authentication Server (RADIUS).", diff: "IMPORTANT" },
      { q: "What is the difference between WPA2-Personal and WPA2-Enterprise?", a: "WPA2-Personal uses a static Pre-Shared Key (PSK) shared by all users; WPA2-Enterprise uses 802.1X where each user has unique individual credentials.", diff: "IMPORTANT" },
      { q: "Which UDP ports are standard for RADIUS Authentication and Accounting?", a: "Authentication: UDP 1812 (legacy 1645); Accounting: UDP 1813 (legacy 1646).", diff: "EASY" }
    ]
  },
  {
    id: 6,
    number: "06",
    title: "CDMA",
    category: "Modulation & Signal Analysis",
    difficulty: "Intermediate",
    estimatedTime: "40 mins",
    shortDesc: "Simulate Code Division Multiple Access with user data inputs, orthogonal Walsh chip spreading, composite channel mixing, and despreading.",
    aim: "To demonstrate the operating principles of Code Division Multiple Access (CDMA) by encoding multiple user bitstreams with orthogonal spreading codes, multiplexing on a shared medium, and recovering original data via despreading.",
    requirements: [
      "Binary Data Generator for User A and User B",
      "Orthogonal Walsh Code Generator (N=4 chips)",
      "Bipolar NRZ Encoder (+1 / -1)",
      "Composite Channel Adder",
      "Inner Product Despreading Correlator"
    ],
    theory: {
      overview: "Code Division Multiple Access (CDMA) is a digital multiple-access technique where multiple transmitters send signals simultaneously over the same frequency channel. Separation is achieved through unique orthogonal mathematical codes (Walsh-Hadamard codes).",
      keyPoints: [
        "Spreading Process: Each data bit of duration Tb is multiplied by a higher-frequency pseudo-noise (PN) code consisting of chips of duration Tc (where Tb >> Tc).",
        "Spreading Factor (Processing Gain): G = Tb / Tc = Number of chips per bit.",
        "Orthogonality Principle: For orthogonal codes C_A and C_B: (C_A · C_B) = 0 and (C_A · C_A) = N.",
        "Composite Channel: S_composite = (Data_A ⊗ Code_A) + (Data_B ⊗ Code_B).",
        "Despreading Correlator: Multiplying S_composite by Code_A cancels Code_B to zero, recovering Data_A perfectly."
      ],
      standards: [
        { std: "IS-95 / cdma2000", freq: "800 / 1900 MHz", maxRate: "153 kbps - 3.1 Mbps", modulation: "DSSS / QPSK" }
      ]
    },
    topology: {
      type: "CDMA Multiplexing / Demultiplexing",
      nodes: [
        { id: "usera", name: "User A Generator", ip: "Data: 1 0 1 1", mac: "Code A: [1, 1, 1, 1]", desc: "Transmits bit sequence A." },
        { id: "userb", name: "User B Generator", ip: "Data: 0 1 0 1", mac: "Code B: [1, -1, 1, -1]", desc: "Transmits bit sequence B." },
        { id: "channel", name: "Shared Channel", ip: "Composite Sum", mac: "Additive Medium", desc: "Transmits combined chipped signal simultaneously." },
        { id: "rx", name: "CDMA Correlator Receiver", ip: "Dot Product Despreader", mac: "Decodes A & B", desc: "Recovers user bits by inner-product correlation." }
      ],
      flow: ["Data A / B", "Bipolar NRZ (+1 / -1)", "Multiply by Walsh Chips", "Combine on Channel", "Correlate with Code A / B", "Recover Original Bitstream"]
    },
    procedure: [
      "Input binary data sequences for User A (e.g., '1011') and User B (e.g., '0101').",
      "Convert binary 0 to -1 and binary 1 to +1 (Bipolar representation).",
      "Assign orthogonal Walsh spreading codes: Code A = [+1, +1, +1, +1] and Code B = [+1, -1, +1, -1].",
      "Multiply each data bit by its 4-chip spreading code to generate spread chip sequences.",
      "Add the two spread signals together to generate the composite transmission channel signal.",
      "At receiver, calculate the inner product of the composite signal with Code A and divide by N (4).",
      "Threshold at zero to recover User A data; repeat with Code B for User B data.",
      "Verify that recovered data matches the original inputs with zero bit error."
    ],
    configuration: {
      userA_data: "1011",
      userB_data: "0101",
      codeA: [1, 1, 1, 1],
      codeB: [1, -1, 1, -1],
      chipLength: 4,
      channelNoise: "0 dB"
    },
    expectedOutput: "The despreading correlator achieves exact reconstruction: Recovered Data A = 1011, Recovered Data B = 0101.",
    result: "Successfully validated CDMA direct-sequence spread spectrum (DSSS) principles, orthogonal Walsh chip spreading, composite channel addition, and interference-free despreading.",
    viva: [
      { q: "What is the mathematical condition for two codes to be orthogonal?", a: "Their inner product (dot product) over one period equals zero: ∑(C_1[i] * C_2[i]) = 0.", diff: "IMPORTANT" },
      { q: "What is Processing Gain in CDMA?", a: "The ratio of transmission bandwidth (chip rate) to baseband information bandwidth (bit rate): G = W / R.", diff: "IMPORTANT" },
      { q: "What problem does power control solve in CDMA cellular networks?", a: "The Near-Far Problem, where a transmitter close to the base station could drown out a distant transmitter without accurate power leveling.", diff: "MEDIUM" }
    ]
  },
  {
    id: 7,
    number: "07",
    title: "AM, FM, PM",
    category: "Modulation & Signal Analysis",
    difficulty: "Intermediate",
    estimatedTime: "40 mins",
    shortDesc: "Simulate and compare continuous-wave Analog Modulation schemes: Amplitude Modulation, Frequency Modulation, and Phase Modulation.",
    aim: "To design, simulate, and dynamically analyze continuous-wave analog modulation techniques (AM, FM, PM) in the time domain with interactive modulation index and frequency adjustments.",
    requirements: [
      "Sinusoidal Message (Baseband) Signal Generator",
      "High-Frequency RF Carrier Wave Generator",
      "AM / FM / PM Time-Domain Mathematical Engine",
      "Interactive Real-Time Waveform Oscilloscope"
    ],
    theory: {
      overview: "Continuous-wave modulation imprints a low-frequency information-bearing message signal m(t) onto a high-frequency sinusoidal carrier c(t) = Ac*cos(2π*fc*t + φ) by varying carrier amplitude, frequency, or instantaneous phase.",
      keyPoints: [
        "Amplitude Modulation (AM): s_AM(t) = [Ac + m(t)] cos(2π*fc*t) = Ac[1 + μ*cos(2π*fm*t)] cos(2π*fc*t). Amplitude varies linearly; frequency and phase remain fixed.",
        "Modulation Index for AM (μ): μ = Am / Ac. If μ > 1, overmodulation occurs, causing envelope distortion and phase reversal.",
        "Frequency Modulation (FM): s_FM(t) = Ac*cos(2π*fc*t + β*sin(2π*fm*t)). Instantaneous frequency varies with message amplitude.",
        "Phase Modulation (PM): s_PM(t) = Ac*cos(2π*fc*t + kp*m(t)). Instantaneous phase deviation is directly proportional to message amplitude."
      ],
      standards: [
        { std: "Standard AM", freq: "535 - 1705 kHz", maxRate: "Analog Audio", modulation: "AM DSB-FC" },
        { std: "Commercial FM", freq: "88 - 108 MHz", maxRate: "High Fidelity Audio", modulation: "Wideband FM (75kHz dev)" }
      ]
    },
    topology: {
      type: "Analog Modulator Circuitry",
      nodes: [
        { id: "msg", name: "Message Generator m(t)", ip: "Low Freq (fm)", mac: "Baseband Audio", desc: "Sinusoidal information signal." },
        { id: "carrier", name: "RF Carrier c(t)", ip: "High Freq (fc)", mac: "RF Local Oscillator", desc: "Sinusoidal radio carrier." },
        { id: "modulator", name: "Modulation Engine", ip: "Non-Linear Mixer", mac: "AM/FM/PM Processor", desc: "Modulates amplitude, frequency, or phase." },
        { id: "scope", name: "Visualizer Oscilloscope", ip: "Time-Domain Display", mac: "Waveform Plotter", desc: "Displays 3 synchronized signal tracks." }
      ],
      flow: ["Message Signal m(t)", "Carrier Signal c(t)", "Modulator (AM / FM / PM)", "Modulated RF Wave s(t)"]
    },
    procedure: [
      "Select modulation type tab: AM, FM, or PM.",
      "Set Message Signal parameters: Amplitude (Am) and Frequency (fm).",
      "Set Carrier Signal parameters: Amplitude (Ac) and Frequency (fc, where fc >> fm).",
      "Adjust the Modulation Index (μ for AM, β for FM, kp for PM).",
      "Observe the real-time calculated waveforms: Message, Carrier, and Modulated wave.",
      "For AM, increase μ past 1.0 to witness overmodulation envelope distortion.",
      "For FM, observe frequency compression during message peaks and expansion during troughs.",
      "For PM, observe abrupt phase shifts corresponding to the derivative of the modulating wave."
    ],
    configuration: {
      messageAmp: 1.0,
      messageFreq: 2.0,
      carrierAmp: 2.0,
      carrierFreq: 20.0,
      amModIndex: 0.8,
      fmBeta: 3.0,
      pmDeviation: 1.5
    },
    expectedOutput: "Smooth, mathematically precise real-time waveform plots demonstrating AM envelope variation, FM frequency deviation, and PM phase transitions.",
    result: "Successfully implemented, analyzed, and compared AM, FM, and PM continuous-wave analog modulation characteristics.",
    viva: [
      { q: "Why is FM more immune to noise compared to AM?", a: "Atmospheric and electrical noise predominantly affect signal amplitude; FM receivers use limiters to clip amplitude variations without losing frequency-encoded data.", diff: "IMPORTANT" },
      { q: "What is overmodulation in AM and why is it undesirable?", a: "Overmodulation occurs when μ > 1 (Am > Ac); the envelope crosses zero, creating severe harmonic distortion and adjacent channel interference (splatter).", diff: "IMPORTANT" },
      { q: "What is Carson's Rule for FM bandwidth?", a: "Bandwidth BW ≈ 2(Δf + fm) = 2(β + 1)fm, where Δf is peak frequency deviation and fm is maximum modulating frequency.", diff: "MEDIUM" }
    ]
  },
  {
    id: 8,
    number: "08",
    title: "BASK, BFSK, BPSK AND QPSK",
    category: "Modulation & Signal Analysis",
    difficulty: "Intermediate",
    estimatedTime: "45 mins",
    shortDesc: "Simulate digital modulation: Binary Amplitude, Frequency, Phase Shift Keying, and Quadrature Phase Shift Keying with Constellation display.",
    aim: "To simulate digital bandpass modulation techniques (BASK, BFSK, BPSK, and QPSK), evaluate signal representations for arbitrary binary bitstreams, and plot the QPSK constellation diagram.",
    requirements: [
      "Binary Bitstream Data Stream (e.g. 10110101)",
      "Digital Carrier Generators (In-phase & Quadrature oscillators)",
      "Digital Modulator Engine (BASK, BFSK, BPSK, QPSK)",
      "I/Q Constellation Diagram Visualizer"
    ],
    theory: {
      overview: "Digital modulation shifts the amplitude, frequency, or phase of an analog carrier wave in response to discrete binary bits or M-ary symbols.",
      keyPoints: [
        "BASK (Binary Amplitude Shift Keying / OOK): Bit 1 transmits carrier wave Ac*cos(2π*fc*t); Bit 0 transmits zero (or lower amplitude).",
        "BFSK (Binary Frequency Shift Keying): Bit 1 transmits frequency f1; Bit 0 transmits frequency f2 (separated by orthogonal distance Δf).",
        "BPSK (Binary Phase Shift Keying): Carrier phase shifts 180° (π rad) between bit 1 (phase 0) and bit 0 (phase π).",
        "QPSK (Quadrature Phase Shift Keying): Groups bits into pairs (dibits: 00, 01, 10, 11); each symbol has one of 4 phase states (45°, 135°, 225°, 315°), doubling spectral efficiency."
      ],
      standards: [
        { std: "BPSK", freq: "Satellite / DSSS", maxRate: "1 bit/symbol", modulation: "2 Phase States" },
        { std: "QPSK", freq: "DVB-S / LTE / Wi-Fi", maxRate: "2 bits/symbol", modulation: "4 Phase States (I/Q)" }
      ]
    },
    topology: {
      type: "Digital Modulation System",
      nodes: [
        { id: "bitstream", name: "Bit Stream", ip: "10110101", mac: "Baseband NRZ", desc: "Incoming digital bitstream." },
        { id: "serial2parallel", name: "Dibit Splitter", ip: "I-bit & Q-bit", mac: "Serial-to-Parallel", desc: "Splits bits into In-Phase (I) and Quadrature (Q)." },
        { id: "carriers", name: "Quadrature Carriers", ip: "cos(2πfct) & sin(2πfct)", mac: "90° Phase Shift", desc: "Orthogonal carriers." },
        { id: "constellation", name: "I/Q Constellation", ip: "Complex Plane", mac: "4 Phase Points", desc: "Displays symbol decision boundaries." }
      ],
      flow: ["Bitstream (10110101)", "Carrier Multipliers", "Modulated RF Signal", "Constellation Plot (I vs Q)"]
    },
    procedure: [
      "Enter a test binary bit sequence (e.g., '10110101').",
      "Select modulation scheme tab: BASK, BFSK, BPSK, or QPSK.",
      "Click [START SIMULATION] to generate synchronized time-domain wave plots.",
      "For BASK, observe carrier presence on '1' and absence on '0'.",
      "For BFSK, observe higher frequency f1 on '1' and lower frequency f2 on '0'.",
      "For BPSK, inspect the 180° phase inversion at bit transitions (0 -> 1 or 1 -> 0).",
      "For QPSK, inspect bit pair grouping (dibits) and the 4 constellation points at (±1/√2, ±1/√2).",
      "Use Play, Pause, and Reset controls to observe real-time symbol transitions."
    ],
    configuration: {
      bitSequence: "10110101",
      carrierFreq: 4.0,
      fskFreqLow: 2.0,
      fskFreqHigh: 6.0,
      symbolDuration: 1.0,
      activeScheme: "QPSK"
    },
    expectedOutput: "Synchronized digital data and modulated signal waveforms with real-time I/Q constellation diagram showing discrete 4-quadrant points for QPSK.",
    result: "Successfully simulated and characterized BASK, BFSK, BPSK, and QPSK digital modulation schemes and verified QPSK constellation mapping.",
    viva: [
      { q: "How many bits are transmitted per symbol in QPSK compared to BPSK?", a: "QPSK transmits 2 bits per symbol (dibits), while BPSK transmits only 1 bit per symbol.", diff: "IMPORTANT" },
      { q: "What is an I/Q Constellation diagram?", a: "A 2D polar/Cartesian representation of digital modulation symbols displaying In-Phase (I) on the x-axis and Quadrature (Q) on the y-axis.", diff: "IMPORTANT" },
      { q: "Why is BPSK more robust against noise than BASK?", a: "BPSK relies on phase detection with maximum distance between antipodal states (+Ac vs -Ac = 2Ac distance), whereas BASK relies on amplitude thresholding vulnerable to fading.", diff: "MEDIUM" }
    ]
  },
  {
    id: 9,
    number: "09",
    title: "PULSE MODULATION",
    category: "Modulation & Signal Analysis",
    difficulty: "Beginner",
    estimatedTime: "35 mins",
    shortDesc: "Simulate Pulse Amplitude (PAM), Pulse Width (PWM), and Pulse Position Modulation (PPM) with real-time duty cycle and position tracking.",
    aim: "To demonstrate and compare pulse analog modulation techniques: Pulse Amplitude Modulation (PAM), Pulse Width Modulation (PWM), and Pulse Position Modulation (PPM) from a continuous analog message signal.",
    requirements: [
      "Low-frequency Analog Modulating Signal m(t)",
      "High-frequency Pulse Clock / Carrier Generator",
      "Sample-and-Hold Circuit Simulator",
      "Pulse Width and Position Modulator Math Models"
    ],
    theory: {
      overview: "Pulse modulation converts continuous analog message signals into a train of discrete pulses where carrier pulse characteristics (amplitude, width, or position) are modulated according to the instantaneous sampling value.",
      keyPoints: [
        "Pulse Amplitude Modulation (PAM): The amplitude of each rectangular pulse is directly proportional to the instantaneous sampled message amplitude. Pulse width and position stay constant.",
        "Pulse Width Modulation (PWM / PDM): The duration (width / duty cycle) of each pulse varies proportionally with the message amplitude. Pulse amplitude and starting position remain constant.",
        "Pulse Position Modulation (PPM): The time position of each pulse relative to an unmodulated clock reference shifts in proportion to the message amplitude. Pulse amplitude and width remain constant."
      ],
      standards: [
        { std: "Nyquist-Shannon", freq: "Sampling Theorem", maxRate: "fs >= 2*fm", modulation: "Pulse Baseband" }
      ]
    },
    topology: {
      type: "Pulse Modulator Stages",
      nodes: [
        { id: "analog", name: "Analog Message m(t)", ip: "Continuous Sine", mac: "Baseband Input", desc: "Information signal." },
        { id: "sampler", name: "Pulse Clock Generator", ip: "Clock Train fs", mac: "Sampling Frequency", desc: "Periodic pulses." },
        { id: "pam", name: "PAM Generator", ip: "Amplitude Modulator", mac: "Sample & Hold", desc: "Varies pulse height." },
        { id: "pwm", name: "PWM / PPM Generator", ip: "Width / Position Modulator", mac: "Comparator & Ramp", desc: "Varies duty cycle or delay." }
      ],
      flow: ["Analog Wave m(t)", "Periodic Pulse Train", "PAM (Variable Height)", "PWM (Variable Width)", "PPM (Variable Time Offset)"]
    },
    procedure: [
      "Select pulse modulation scheme: PAM, PWM, or PPM.",
      "Adjust modulating signal frequency and amplitude sliders.",
      "Adjust sampling pulse train frequency ensuring fs >= 2*fm to satisfy the Nyquist criterion.",
      "Observe PAM: pulses maintain fixed width while their peak heights trace the modulating sine wave.",
      "Observe PWM: pulses maintain constant height while their widths widen at positive peaks and narrow at troughs.",
      "Observe PPM: pulses maintain constant height and width while their arrival timestamps shift left/right.",
      "Compare the noise immunity differences between PAM vs PWM and PPM."
    ],
    configuration: {
      messageFreq: 1.5,
      messageAmp: 1.0,
      pulseFreq: 15.0,
      pulseWidthBase: 0.03,
      mode: "PAM"
    },
    expectedOutput: "Synchronized multi-track visual waveforms displaying continuous message wave and the corresponding PAM, PWM, and PPM modulated pulse trains.",
    result: "Successfully simulated and compared PAM, PWM, and PPM pulse analog modulation schemes and verified sampling theorem compliance.",
    viva: [
      { q: "What is the Nyquist Sampling Rate?", a: "The minimum sampling frequency required to completely reconstruct a bandlimited signal: fs ≥ 2*fm_max.", diff: "EASY" },
      { q: "Why is PWM or PPM preferred over PAM for noisy channels?", a: "PAM encodes data in pulse height, making it sensitive to amplitude noise; PWM and PPM use timing/width, which can be cleaned with amplitude limiters.", diff: "IMPORTANT" },
      { q: "What common industrial applications use PWM?", a: "Motor speed control, LED dimming, switch-mode power supplies (SMPS), and Class-D audio amplifiers.", diff: "MEDIUM" }
    ]
  },
  {
    id: 10,
    number: "10",
    title: "OFDM",
    category: "Modulation & Signal Analysis",
    difficulty: "Advanced",
    estimatedTime: "50 mins",
    shortDesc: "Simulate Orthogonal Frequency Division Multiplexing with multi-carrier orthogonal subcarriers, IFFT principle, and spectral efficiency analysis.",
    aim: "To demonstrate the working principle of Orthogonal Frequency Division Multiplexing (OFDM), visualize overlapping orthogonal subcarriers, and investigate how OFDM mitigates multipath fading.",
    requirements: [
      "High-speed Serial Input Bitstream Generator",
      "Serial-to-Parallel (S/P) Converter",
      "Orthogonal Subcarrier Frequency Synthesizer (4, 8, 16, 32 carriers)",
      "Inverse Fast Fourier Transform (IFFT) Simulator",
      "Orthogonal Sinc Frequency Spectrum Visualizer"
    ],
    theory: {
      overview: "Orthogonal Frequency Division Multiplexing (OFDM) is a multi-carrier digital modulation technique that divides a single high-rate data stream into many lower-rate parallel subcarriers spaced at the precise inverse of the symbol duration (Δf = 1/Ts) to guarantee mathematical orthogonality.",
      keyPoints: [
        "Orthogonality Condition: The peak of each subcarrier's sinc frequency response coincides precisely with the zero-crossings of all neighboring subcarriers, preventing inter-carrier interference (ICI) even with spectral overlap.",
        "IFFT / FFT Implementation: In practice, OFDM is efficiently synthesized using the Inverse Fast Fourier Transform (IFFT) at the transmitter and Fast Fourier Transform (FFT) at the receiver.",
        "Cyclic Prefix (CP): A copy of the end of the OFDM symbol prepended to the front, converting linear convolution into circular convolution to eliminate Inter-Symbol Interference (ISI) caused by multipath dispersion.",
        "Why Modern Systems Use OFDM: Used in 4G LTE, 5G NR, Wi-Fi 4/5/6, and DVB-T due to exceptional spectral efficiency and multipath resilience."
      ],
      standards: [
        { std: "IEEE 802.11ax (Wi-Fi 6)", freq: "OFDMA", maxRate: "Subcarriers up to 2048", modulation: "1024-QAM" },
        { std: "5G NR", freq: "Scalable Numerology", maxRate: "Flexible subcarrier spacing (15-240 kHz)", modulation: "CP-OFDM" }
      ]
    },
    topology: {
      type: "OFDM Transmitter / Receiver Chain",
      nodes: [
        { id: "serial", name: "High-Rate Serial Bits", ip: "R bits/sec", mac: "Data Source", desc: "High-speed bitstream." },
        { id: "sp", name: "Serial-to-Parallel (S/P)", ip: "N parallel streams", mac: "Rate Divider", desc: "Reduces symbol rate by factor of N." },
        { id: "ifft", name: "IFFT Processor", ip: "N-Point Transform", mac: "Frequency -> Time", desc: "Modulates all orthogonal subcarriers simultaneously." },
        { id: "cp", name: "Cyclic Prefix Inserter", ip: "Guard Interval", mac: "ISI Prevention", desc: "Prepends tail of symbol to mitigate delay spread." },
        { id: "spectrum", name: "Composite Spectrum", ip: "Overlapping Sinc Curves", mac: "Zero ICI", desc: "Shows spectral peaks on zero crossings." }
      ],
      flow: ["Serial Bitstream", "S/P Converter", "QAM Constellation Mapping", "IFFT Block", "Add Cyclic Prefix", "Overlapping Orthogonal Spectrum"]
    },
    procedure: [
      "Set the number of orthogonal subcarriers using the slider: 4, 8, 16, or 32 subcarriers.",
      "Input a simulated serial bitstream.",
      "Observe the Serial-to-Parallel conversion dividing the bit rate across N subcarriers.",
      "Inspect the generated overlapping subcarrier sinc spectra on the interactive frequency plot.",
      "Verify that at the center frequency of each subcarrier, the amplitude of all other subcarriers is zero (orthogonality).",
      "Inspect the time-domain composite OFDM symbol generated by the IFFT summation.",
      "Review the key advantages: spectral efficiency, multipath resistance, and simple single-tap equalization."
    ],
    configuration: {
      subcarrierCount: 8,
      subcarrierSpacingKHz: 312.5,
      fftSize: 64,
      cyclicPrefixLength: 16,
      modulationType: "QPSK per subcarrier"
    },
    expectedOutput: "Clear multi-subcarrier orthogonal sinc spectrum plot showing zero-crossings alignment, composite time-domain OFDM wave, and IFFT conversion breakdown.",
    result: "Successfully validated OFDM multi-carrier modulation, subcarrier orthogonality, spectral overlapping without inter-carrier interference, and cyclic prefix protection.",
    viva: [
      { q: "What does orthogonality mean in the context of OFDM subcarriers?", a: "Subcarriers are spaced at Δf = 1/Ts such that over the symbol period Ts, the integral of the product of any two distinct subcarriers is exactly zero.", diff: "IMPORTANT" },
      { q: "What is the role of the Cyclic Prefix (CP) in OFDM?", a: "The CP prevents Inter-Symbol Interference (ISI) from multipath delay spread and preserves subcarrier orthogonality by turning linear channel convolution into circular convolution.", diff: "IMPORTANT" },
      { q: "What is the primary drawback of OFDM?", a: "High Peak-to-Average Power Ratio (PAPR), requiring highly linear RF power amplifiers to avoid non-linear distortion.", diff: "MEDIUM" }
    ]
  },
  {
    id: 11,
    number: "11",
    title: "WI-FI SCANNER",
    category: "Wi-Fi Scanning & Security",
    difficulty: "Beginner",
    estimatedTime: "30 mins",
    shortDesc: "Simulated 802.11 Wi-Fi scanner for educational exploration of SSIDs, RSSI signal levels, channels, frequencies, and security protocols.",
    aim: "To demonstrate wireless network discovery procedures by scanning simulated IEEE 802.11 2.4 GHz and 5 GHz frequency bands, evaluating received signal strength (RSSI), and cataloging security parameters.",
    requirements: [
      "Simulated Wi-Fi Radio Scanner Engine",
      "Simulated RF Environment with multi-SSID broadcasts",
      "Band and Security Filter Interface",
      "RSSI Signal Quality Meter"
    ],
    theory: {
      overview: "Wi-Fi scanners passively listen for 802.11 Beacon frames periodically broadcast by Access Points (typically every 102.4 ms) and actively send 802.11 Probe Request frames to discover hidden or active wireless networks.",
      keyPoints: [
        "RSSI (Received Signal Strength Indicator): Relative received signal power measured in dBm (decibel-milliwatts). Typically ranges from -30 dBm (exceptional) to -90 dBm (barely usable).",
        "Passive Scanning: Radio dwells on each channel listening for AP beacon frames without transmitting RF energy.",
        "Active Scanning: Station transmits 802.11 Probe Requests on each channel and waits for Probe Responses.",
        "Frequency Bands: 2.4 GHz (Channels 1-14, long range, high interference) vs 5 GHz (Channels 36-165, higher speed, lower congestion).",
        "Educational Notice: This scanner utilizes simulated demo data and never interacts with real hardware."
      ],
      standards: [
        { std: "IEEE 802.11", freq: "Passive/Active Scan", maxRate: "Beacon Discovery", modulation: "Demo Simulation Data" }
      ]
    },
    topology: {
      type: "Wireless RF Environment Scan",
      nodes: [
        { id: "scanner", name: "Scanner Station", ip: "RF Promiscuous", mac: "Local Simulator", desc: "Simulated station scanning 802.11 channels." },
        { id: "ap1", name: "College_WiFi", ip: "Ch 6 / 2.4GHz", mac: "00:1A:2B:3C:4D:01", desc: "Campus main network with -52 dBm RSSI." },
        { id: "ap2", name: "Lab_WiFi", ip: "Ch 36 / 5GHz", mac: "00:1A:2B:3C:4D:02", desc: "CS lab network with -45 dBm RSSI." },
        { id: "ap3", name: "Guest_WiFi", ip: "Ch 1 / 2.4GHz", mac: "00:1A:2B:3C:4D:03", desc: "Open guest network with -78 dBm RSSI." },
        { id: "ap4", name: "Student_Network", ip: "Ch 11 / 2.4GHz", mac: "00:1A:2B:3C:4D:04", desc: "Hostel network with -64 dBm RSSI." },
        { id: "ap5", name: "IoT_Lab", ip: "Ch 149 / 5GHz", mac: "00:1A:2B:3C:4D:05", desc: "Sensor network with -70 dBm RSSI." }
      ],
      flow: ["Radio Tuning", "Channel Dwell", "Receive Beacon / Probe Response", "Parse BSSID, SSID, RSSI, Security", "Populate Scanner Table"]
    },
    procedure: [
      "Launch the simulated Wi-Fi Scanner interface.",
      "Select desired band filter: 'All Bands', '2.4 GHz Only', or '5 GHz Only'.",
      "Select security filter: 'All', 'WPA2', 'WPA3', or 'Open'.",
      "Click [SCAN NETWORKS] to initiate animated channel sweeping.",
      "Observe simulated discovered networks populating with SSID, Channel, Frequency, RSSI, and Security.",
      "Click on any discovered network to inspect details like MAC BSSID, vendor OUI, and signal quality.",
      "Verify safety banner confirming educational simulation mode."
    ],
    configuration: {
      scanMode: "Dual-Band Passive/Active",
      channelsToScan: "1-13 (2.4 GHz), 36-165 (5 GHz)",
      minRssiThreshold: -95
    },
    expectedOutput: "A responsive table of simulated Wi-Fi networks with graphical RSSI signal bars, channel indicators, and security badges.",
    result: "Successfully demonstrated 802.11 Wi-Fi network scanning, RSSI measurement, and security classification using simulated radio data.",
    viva: [
      { q: "What does RSSI stand for and what units is it measured in?", a: "Received Signal Strength Indicator; measured in dBm (decibels relative to 1 milliwatt), negative values.", diff: "EASY" },
      { q: "What is the difference between active and passive scanning?", a: "Passive scanning only listens for periodic AP beacon frames; active scanning sends Probe Requests to elicit fast Probe Responses.", diff: "IMPORTANT" },
      { q: "What constitutes a good Wi-Fi RSSI level for stable HD video conferencing?", a: "-65 dBm or better (e.g. -50 to -65 dBm); signals below -75 dBm experience packet loss and latency.", diff: "MEDIUM" }
    ]
  },
  {
    id: 12,
    number: "12",
    title: "WI-FI ANALYZER",
    category: "Wi-Fi Scanning & Security",
    difficulty: "Intermediate",
    estimatedTime: "40 mins",
    shortDesc: "Simulated Wi-Fi channel analyzer with 2.4 GHz & 5 GHz channel overlap graphs, co-channel interference meter, and spectral density visualization.",
    aim: "To analyze Wi-Fi channel allocation, quantify adjacent and co-channel interference across 2.4 GHz and 5 GHz frequency bands, and identify optimal non-overlapping channels.",
    requirements: [
      "Simulated RF Channel Spectrum Analyzer Engine",
      "2.4 GHz Spectral Curve Renderer (Channels 1 to 14, 22 MHz channel width)",
      "5 GHz UNII-1/2/3 Spectral Visualizer (Channels 36 to 165)",
      "Interference Calculator and Channel Recommendation Engine"
    ],
    theory: {
      overview: "Wi-Fi channels are designated frequency bands within the 2.4 GHz and 5 GHz spectra. In 2.4 GHz, each standard channel is 20 MHz wide with 5 MHz spacing between center frequencies, causing heavy spectral overlap unless specific non-overlapping channels (1, 6, 11) are chosen.",
      keyPoints: [
        "2.4 GHz Non-overlapping Channels: Only channels 1, 6, and 11 do not overlap with each other in North American / European deployments.",
        "Adjacent Channel Interference (ACI): Transmitters on nearby channels (e.g., Ch 1 and Ch 2) emit energy into each other's passband, causing RF noise and packet errors.",
        "Co-Channel Interference (CCI): Transmitters on the exact same channel share medium access via CSMA/CA, causing contention and reduced throughput.",
        "5 GHz Advantage: Channels are spaced 20 MHz apart without overlap (Ch 36, 40, 44, 48...), providing 24+ non-overlapping channels."
      ],
      standards: [
        { std: "802.11 DSSS/OFDM", freq: "2.4 GHz (22 MHz wide)", maxRate: "3 Non-overlapping (1, 6, 11)", modulation: "Bell Curve Spectrum" },
        { std: "802.11a/n/ac/ax", freq: "5 GHz (20/40/80/160 MHz)", maxRate: "24+ Non-overlapping", modulation: "Orthogonal Flat Spectrum" }
      ]
    },
    topology: {
      type: "Channel Spectrum Distribution",
      nodes: [
        { id: "ch1", name: "Channel 1 (2412 MHz)", ip: "SSID: Guest_WiFi", mac: "Width: 20/22 MHz", desc: "First standard non-overlapping 2.4 GHz channel." },
        { id: "ch6", name: "Channel 6 (2437 MHz)", ip: "SSID: College_WiFi", mac: "Width: 20/22 MHz", desc: "Second standard non-overlapping 2.4 GHz channel." },
        { id: "ch11", name: "Channel 11 (2462 MHz)", ip: "SSID: Student_Net", mac: "Width: 20/22 MHz", desc: "Third standard non-overlapping 2.4 GHz channel." },
        { id: "5g", name: "5 GHz UNII Bands", ip: "Ch 36, 40, 44, 48", mac: "Spacing: 20 MHz", desc: "Zero spectral overlap between adjacent channels." }
      ],
      flow: ["Select Channel", "Evaluate Co-channel APs", "Calculate Adjacent Interference", "Compute Signal-to-Interference Ratio", "Display Spectrum Curves"]
    },
    procedure: [
      "Select spectrum band: 2.4 GHz or 5 GHz.",
      "Observe simulated bell-curve spectral masks for each active network.",
      "Click on specific channels (e.g., Channel 1, Channel 6, Channel 11).",
      "Inspect the live Signal Strength Meter (in dBm) and Interference Meter (%).",
      "Examine how placing an AP on Channel 3 or 4 causes destructive interference with both Channel 1 and 6.",
      "Switch to 5 GHz to see isolated, non-overlapping channel columns.",
      "Review the automated channel recommendation for minimal interference."
    ],
    configuration: {
      selectedBand: "2.4 GHz",
      activeChannel: 6,
      channelBandwidth: "20 MHz",
      noiseFloor: -95
    },
    expectedOutput: "Interactive spectrum diagram with colored parabolic curves representing networks, live interference meter, and recommendations for optimal channel planning.",
    result: "Successfully analyzed RF channel overlap, measured co-channel and adjacent channel interference, and validated 1-6-11 non-overlapping channel planning principles.",
    viva: [
      { q: "Why are channels 1, 6, and 11 considered non-overlapping in the 2.4 GHz band?", a: "Each channel occupies 20-22 MHz bandwidth but center frequencies are spaced only 5 MHz apart. Channels 1 (2412 MHz), 6 (2437 MHz), and 11 (2462 MHz) are separated by 25 MHz, ensuring zero spectral overlap.", diff: "IMPORTANT" },
      { q: "What is worse: Co-Channel Interference (CCI) or Adjacent Channel Interference (ACI)?", a: "Adjacent Channel Interference (ACI) is worse because devices cannot decode the overlapping frames as valid Wi-Fi and treat it as unmanageable noise; CCI devices simply wait their turn via CSMA/CA.", diff: "IMPORTANT" },
      { q: "What is the bandwidth of a single standard Wi-Fi channel in 2.4 GHz?", a: "20 MHz (or 22 MHz in legacy 802.11b DSSS).", diff: "EASY" }
    ]
  },
  {
    id: 13,
    number: "13",
    title: "LAN TCP/UDP COMMUNICATION",
    category: "Protocol & Transport",
    difficulty: "Intermediate",
    estimatedTime: "40 mins",
    shortDesc: "Simulate and compare connection-oriented TCP (3-way handshake, ACK, reliability) vs connectionless UDP (datagram streaming) over LAN.",
    aim: "To demonstrate and compare the transport layer protocols TCP and UDP by simulating connection establishment, packet transmission, header structure, and acknowledgment mechanisms across a local area network.",
    requirements: [
      "Simulated Client Workstation (Source IP: 192.168.1.50)",
      "Layer 2 Switch Aggregator",
      "Simulated Application Server (Dest IP: 192.168.1.10)",
      "Protocol Header Dissector (TCP Flags, Sequence/ACK numbers, UDP Length/Checksum)"
    ],
    theory: {
      overview: "The Transport Layer (OSI Layer 4) provides host-to-host communication services for applications. Transmission Control Protocol (TCP) provides reliable, ordered, and error-checked byte streams; User Datagram Protocol (UDP) provides lightweight, connectionless datagram delivery.",
      keyPoints: [
        "TCP 3-Way Handshake: SYN -> SYN-ACK -> ACK establishes synchronized sequence numbers before data exchange.",
        "TCP Reliability: Guarantees delivery via positive acknowledgments (ACK), retransmission timeouts, and flow control (sliding window).",
        "UDP Datagrams: Connectionless, lightweight 8-byte header (Src Port, Dst Port, Length, Checksum) with zero handshake delay.",
        "Comparison: TCP suits web browsing (HTTP/HTTPS), email (SMTP), and file transfer (FTP); UDP suits live streaming (RTP), VoIP, DNS queries, and online gaming."
      ],
      standards: [
        { std: "RFC 793 (TCP)", freq: "Transport Layer", maxRate: "Reliable / Flow Controlled", modulation: "20-byte Header" },
        { std: "RFC 768 (UDP)", freq: "Transport Layer", maxRate: "Low Latency / Best Effort", modulation: "8-byte Header" }
      ]
    },
    topology: {
      type: "Transport Layer LAN",
      nodes: [
        { id: "client", name: "Client Station", ip: "192.168.1.50", mac: "Port: 49152 (Dynamic)", desc: "Initiates transport layer communication." },
        { id: "switch", name: "Switch Aggregator", ip: "Layer 2 Bridge", mac: "CAM Forwarding", desc: "Forwards Ethernet frames between client and server." },
        { id: "server", name: "Target Server", ip: "192.168.1.10", mac: "Port: 80 / 53", desc: "Listens on TCP/UDP service ports." }
      ],
      flow: ["Client", "Switch", "Server", "SYN -> SYN-ACK -> ACK (TCP) OR Datagram Fire-and-Forget (UDP)"]
    },
    procedure: [
      "Select transport protocol: TCP or UDP.",
      "Enter a custom payload message e.g., 'HELLO SERVER'.",
      "Specify source port (e.g., 49152) and destination port (e.g., 80 for HTTP, 53 for DNS).",
      "Click [TRANSMIT PACKET] to trigger the simulated exchange.",
      "For TCP, observe: 1) SYN sent, 2) SYN-ACK returned, 3) ACK sent, 4) Data segment delivered, 5) Server ACK returned.",
      "For UDP, observe: Immediate datagram transmission with zero handshake or ACK packets.",
      "Inspect the decoded packet headers showing IP addresses, ports, checksums, sequence numbers, and flags.",
      "Review the side-by-side TCP vs UDP comparison matrix."
    ],
    configuration: {
      protocol: "TCP",
      sourceIp: "192.168.1.50",
      destIp: "192.168.1.10",
      sourcePort: 49152,
      destPort: 80,
      payload: "HELLO SERVER"
    },
    expectedOutput: "Animated packet traversal over the topology, interactive packet header inspector, and terminal log showing connection state machine progression.",
    result: "Successfully simulated and compared connection-oriented TCP handshake/acknowledgment mechanisms versus connectionless UDP datagram delivery.",
    viva: [
      { q: "Explain the TCP 3-way handshake process.", a: "1. Client sends SYN (synchronize seq=x). 2. Server replies with SYN-ACK (seq=y, ack=x+1). 3. Client sends ACK (ack=y+1). Connection is established.", diff: "IMPORTANT" },
      { q: "Why is UDP preferred over TCP for real-time video and audio streaming?", a: "UDP avoids handshake latency, acknowledgment overhead, and retransmission delays; dropped frames in live audio/video are negligible compared to buffering delays.", diff: "IMPORTANT" },
      { q: "What is the minimum header size of TCP and UDP?", a: "TCP header is 20 bytes (without options); UDP header is only 8 bytes.", diff: "EASY" }
    ]
  },
  {
    id: 14,
    number: "14",
    title: "BEACON FRAME CAPTURE AND ANALYSIS",
    category: "Wi-Fi Scanning & Security",
    difficulty: "Advanced",
    estimatedTime: "45 mins",
    shortDesc: "Simulated 802.11 Management Beacon Frame packet capture and deep dissection of MAC headers, Frame Control, and Information Elements (IEs).",
    aim: "To capture and dissect simulated IEEE 802.11 Beacon management frames, examine MAC header fields, decode Information Elements (IEs), and understand AP synchronization announcements.",
    requirements: [
      "Simulated 802.11 Packet Sniffer Engine",
      "Simulated RF Traffic Buffer with pre-generated beacon captures",
      "Wireshark-style Packet List and Frame Tree Dissector",
      "Information Element (IE) Hex and Field Decoder"
    ],
    theory: {
      overview: "Beacon frames are IEEE 802.11 management frames (Type 00, Subtype 1000) periodically broadcast by Access Points to advertise the presence, capabilities, and parameters of a Basic Service Set (BSS).",
      keyPoints: [
        "Frame Format: MAC Header (Frame Control, Duration, Destination DA, Source SA, BSSID, Sequence Control) + Frame Body + Frame Check Sequence (FCS).",
        "Target Beacon Transmission Time (TBTT): Default interval is 100 Time Units (1 TU = 1024 microseconds ≈ 102.4 ms).",
        "Fixed Parameters: Timestamp (for TSF synchronization), Beacon Interval, Capability Information (ESS, Privacy/WEP, Short Preamble, Spectrum).",
        "Information Elements (Tagged Parameters): Variable-length TLV (Type-Length-Value) blocks including SSID (Tag 0), Supported Rates (Tag 1), DSSS Parameter Set / Channel (Tag 3), and RSN Security / WPA2 (Tag 48)."
      ],
      standards: [
        { std: "IEEE 802.11-2020", freq: "Management Type 0", maxRate: "Subtype 8 (Beacon)", modulation: "Simulated Frame Dissection" }
      ]
    },
    topology: {
      type: "802.11 Management Frame Sniffing",
      nodes: [
        { id: "ap", name: "Transmitting AP", ip: "BSSID: 00:14:22:01:23:45", mac: "SSID: College_WiFi", desc: "Broadcasts Beacon frame every 102.4 ms." },
        { id: "channel", name: "Wireless Channel 6", ip: "2437 MHz", mac: "Broadcast Medium", desc: "Transmits over-the-air frame." },
        { id: "sniffer", name: "Educational Packet Sniffer", ip: "Monitor Mode (Demo)", mac: "Dissector", desc: "Captures and parses fields into tree view." }
      ],
      flow: ["AP Generates Beacon", "Assemble MAC Header + Body + Tagged IEs", "Broadcast on Channel", "Simulated Sniffer Captures Frame", "Deep Tree Field Inspection"]
    },
    procedure: [
      "Click [CAPTURE DEMO FRAMES] to generate a live buffer of simulated 802.11 beacon frames.",
      "Select a beacon frame from the captured packet list.",
      "Click [ANALYZE FRAME] to open the hierarchical frame dissector view.",
      "Inspect the MAC Header: Frame Control (Type: Management, Subtype: Beacon), Duration, Destination (Broadcast ff:ff:ff:ff:ff:ff), Source AP MAC, and BSSID.",
      "Inspect Frame Body fixed fields: Timestamp (TSF microsecond clock), Beacon Interval (100 TU), and Capability Flags.",
      "Drill down into Information Elements: Tag 0 (SSID), Tag 1 (Supported Rates), Tag 3 (DSSS Channel), and Tag 48 (RSN Information / WPA2 AES).",
      "Observe field highlighting when clicking specific sections of the packet structure."
    ],
    configuration: {
      captureFilter: "wlan.fc.type_subtype == 0x0008",
      channel: 6,
      beaconIntervalTU: 100,
      bssid: "00:14:22:01:23:45"
    },
    expectedOutput: "A realistic packet dissection interface displaying frame summary, expandable tree hierarchy, and decoded field values with visual color-coded block breakdown.",
    result: "Successfully captured and decoded simulated IEEE 802.11 beacon management frames, verified MAC header structure, and analyzed essential Information Elements.",
    viva: [
      { q: "What is the frame type and subtype of an 802.11 Beacon frame?", a: "Type: Management (00); Subtype: Beacon (1000 in binary, or 0x08).", diff: "IMPORTANT" },
      { q: "What is the purpose of the Timestamp field in a Beacon frame?", a: "It contains the AP's 64-bit microsecond Time Synchronization Function (TSF) timer, allowing all associated clients to synchronize their internal clocks for power saving and frequency hopping.", diff: "IMPORTANT" },
      { q: "What destination address is specified in a Beacon frame?", a: "The broadcast MAC address: FF:FF:FF:FF:FF:FF, because beacon announcements must be received by all listening stations.", diff: "EASY" }
    ]
  },
  {
    id: 15,
    number: "15",
    title: "WLAN SECURITY REPORT",
    category: "Wi-Fi Scanning & Security",
    difficulty: "Advanced",
    estimatedTime: "45 mins",
    shortDesc: "Generate an audit report for wireless network configurations, analyzing WPA versions, WPS vulnerabilities, RADIUS integration, and cipher strength.",
    aim: "To conduct an educational security posture audit of simulated wireless local area network configurations, calculate a security rating, and generate a structured vulnerability assessment report.",
    requirements: [
      "Simulated WLAN Security Configuration Form",
      "Vulnerability Audit Engine (WPA3 vs WPA2 vs WEP, WPS, PMF, RADIUS)",
      "Security Scoring and Risk Assessment Matrix",
      "Executive Security Report Generator"
    ],
    theory: {
      overview: "WLAN security has evolved from vulnerable legacy schemes (WEP, WPA-TKIP) to robust modern standards (WPA2-CCMP/AES, WPA3-SAE, 802.1X Enterprise). Thorough audits identify configuration missteps such as active WPS, weak passphrases, or missing Management Frame Protection (PMF).",
      keyPoints: [
        "WEP / WPA-TKIP Flaws: Broken RC4 keystream reuse and weak Michael integrity checks make them trivial to crack in seconds.",
        "WPA2-Personal (PSK): Uses robust AES-CCMP encryption, but vulnerable to offline dictionary/brute-force attacks if 4-way handshakes are intercepted.",
        "WPA3-Personal (SAE): Simultaneous Authentication of Equals uses Dragonfly handshake with forward secrecy, rendering offline dictionary attacks impossible.",
        "Wi-Fi Protected Setup (WPS): PIN-based WPS allows brute-forcing an 8-digit PIN in hours; must be disabled in secure networks.",
        "Protected Management Frames (PMF / 802.11w): Prevents deauthentication and disassociation spoofing attacks."
      ],
      standards: [
        { std: "WPA3", freq: "IEEE 802.11ak/az", maxRate: "Dragonfly SAE", modulation: "CNSA 192-bit / AES-GCM" }
      ]
    },
    topology: {
      type: "Security Audit Framework",
      nodes: [
        { id: "audit_engine", name: "Audit Engine", ip: "Rule Matrix", mac: "CIS Benchmark", desc: "Evaluates config against security standards." },
        { id: "target_wlan", name: "Target WLAN Profile", ip: "Config Input", mac: "SSID & Policies", desc: "User-defined or template configuration." },
        { id: "report", name: "Executive Report", ip: "Generated PDF/View", mac: "Score & Fixes", desc: "Presents score, status tags, and remediation." }
      ],
      flow: ["Input Wireless Config", "Analyze Auth / Encryption / WPS / PMF", "Calculate Overall Score (0-100%)", "Assign Status Badges (SECURE / WARNING / REVIEW)", "Generate Remediation Report"]
    },
    procedure: [
      "Select or customize the simulated WLAN parameters: SSID, Authentication Mode, Encryption Cipher, Password Strength, WPS Status, RADIUS integration, and Guest Network isolation.",
      "Click [GENERATE SECURITY REPORT] to trigger the automated security audit engine.",
      "Review the calculated overall Security Score (e.g., 92% - Grade A).",
      "Inspect category status indicators: Authentication, Encryption, Access Control, Enterprise Security.",
      "Review flagged vulnerability notices (e.g., 'WPS Enabled - High Risk', 'Missing PMF').",
      "Examine prioritized recommendations and remediation steps.",
      "Export or view the executive security audit summary."
    ],
    configuration: {
      ssid: "Enterprise_Campus_Net",
      authentication: "WPA2-Enterprise (802.1X)",
      encryption: "AES-CCMP",
      passwordPolicy: "Strong (16+ chars, alphanumeric + symbols)",
      wpaVersion: "WPA2 / WPA3 Mixed",
      wpsEnabled: false,
      radiusIntegrated: true,
      guestIsolation: true,
      pmfEnabled: true
    },
    expectedOutput: "A professional security audit report featuring risk scores, status badges (SECURE, WARNING, REVIEW), identified vulnerabilities, and actionable hardening recommendations.",
    result: "Successfully audited simulated WLAN security configurations and generated an educational vulnerability assessment report adhering to wireless hardening best practices.",
    viva: [
      { q: "Why is WEP completely obsolete and unsafe?", a: "WEP uses RC4 with a short 24-bit Initialization Vector (IV), resulting in IV collisions that allow attackers to derive the secret key in minutes using tools like Aircrack-ng.", diff: "IMPORTANT" },
      { q: "How does WPA3 Simultaneous Authentication of Equals (SAE) improve security over WPA2-PSK?", a: "SAE uses a zero-knowledge password proof (Dragonfly protocol) that resists offline dictionary attacks and provides forward secrecy even if the password is later compromised.", diff: "IMPORTANT" },
      { q: "Why should WPS (Wi-Fi Protected Setup) be disabled in enterprise environments?", a: "WPS PIN authentication divides the 8-digit PIN into two halves verified separately, reducing the search space to only 11,000 attempts and enabling offline brute-force in hours.", diff: "MEDIUM" }
    ]
  },
  {
    id: 16,
    number: "16",
    title: "BLUETOOTH DISCOVERY",
    category: "Short Range & Bluetooth",
    difficulty: "Beginner",
    estimatedTime: "30 mins",
    shortDesc: "Simulated Bluetooth and BLE inquiry discovery engine scanning for nearby devices, RSSI metrics, and BD_ADDR physical addresses.",
    aim: "To demonstrate Bluetooth Classic and Bluetooth Low Energy (BLE) device discovery mechanisms through simulated inquiry/advertising scanning and signal strength evaluation.",
    requirements: [
      "Simulated Bluetooth Host Controller Interface (HCI) Scanner",
      "Simulated RF Environment with diverse Bluetooth device categories",
      "Discovery Radar Animation Visualizer",
      "Bluetooth Device Information Catalog (BD_ADDR, Class of Device, RSSI)"
    ],
    theory: {
      overview: "Bluetooth discovery operates via Inquiry and Paging procedures in Bluetooth Classic (BR/EDR) and Advertising/Scanning channels (37, 38, 39) in Bluetooth Low Energy (BLE) within the 2.4 GHz ISM band.",
      keyPoints: [
        "Inquiry Procedure (Classic): Inquiring device hops across 32 frequencies sending inquiry packets; discoverable devices respond with Frequency Hopping Synchronization (FHS) packets.",
        "BLE Advertising: Peripheral devices broadcast advertising packets on 3 primary channels (37 = 2402 MHz, 38 = 2426 MHz, 39 = 2480 MHz); scanner listens on these channels.",
        "Bluetooth Device Address (BD_ADDR): 48-bit IEEE MAC-format identifier consisting of NAP, UAP, and LAP segments.",
        "Class of Device (CoD): 24-bit field identifying major and minor device classes (computer, smartphone, audio/video headset, wearable)."
      ],
      standards: [
        { std: "Bluetooth Core 5.3", freq: "2.402 - 2.480 GHz", maxRate: "1 - 3 Mbps (Classic) / 2 Mbps (BLE)", modulation: "GFSK / π/4-DQPSK / 8DPSK" }
      ]
    },
    topology: {
      type: "Bluetooth Piconet Discovery",
      nodes: [
        { id: "laptop", name: "Host Lab Laptop", ip: "Master / Scanner", mac: "B8:27:EB:01:A2:33", desc: "Transmits inquiry / listens for BLE adverts." },
        { id: "phone", name: "Student Phone", ip: "Smartphone", mac: "44:6D:57:9A:BC:10", desc: "BLE Peripheral advertising services, RSSI: -54 dBm." },
        { id: "headset", name: "Wireless Headset", ip: "Audio Sink", mac: "00:1B:66:33:44:55", desc: "A2DP audio device, RSSI: -68 dBm." },
        { id: "watch", name: "Smart Watch", ip: "Wearable", mac: "F4:F5:DB:77:88:99", desc: "BLE Health/Heart Rate profile, RSSI: -62 dBm." },
        { id: "speaker", name: "Lab Audio Speaker", ip: "Speaker System", mac: "70:88:6B:AA:BB:CC", desc: "Bluetooth audio accessory, RSSI: -75 dBm." }
      ],
      flow: ["Host Scanner", "Trigger Inquiry / BLE Scan", "Listen on Channels 37, 38, 39", "Receive Advertising Frames", "Display Discovered Devices"]
    },
    procedure: [
      "Access the simulated Bluetooth Discovery portal.",
      "Click [START DISCOVERY] to trigger the animated scanning radar.",
      "Observe the simulated host issuing inquiry requests across frequency channels.",
      "Monitor the discovery table as devices populate in real-time: Student Phone, Laptop, Wireless Headset, Smart Watch, and Speaker.",
      "Inspect device columns: Device Name, Device Type, Physical Address (BD_ADDR), RSSI signal, and Discovery Status.",
      "Filter devices by category: 'All', 'Audio', 'Phone', 'Wearables'.",
      "Select a device to view quick connection options."
    ],
    configuration: {
      scanDurationSeconds: 8,
      scanType: "BLE Active + Classic BR/EDR",
      channelHopRate: "1600 hops/sec"
    },
    expectedOutput: "An animated radar sweeping display showing nearby devices appearing with accurate simulated BD_ADDRs, RSSI levels, and device class icons.",
    result: "Successfully demonstrated Bluetooth device discovery procedures, inquiry/advertising mechanisms, and signal power estimation using demo data.",
    viva: [
      { q: "How many channels does Bluetooth Low Energy (BLE) use and how many are dedicated to advertising?", a: "BLE uses 40 channels (2 MHz wide); channels 37, 38, and 39 are dedicated to advertising, while channels 0-36 are used for data communication.", diff: "IMPORTANT" },
      { q: "What is a BD_ADDR?", a: "Bluetooth Device Address: a unique 48-bit hardware address formatted like an Ethernet MAC address (e.g. AA:BB:CC:DD:EE:FF).", diff: "EASY" },
      { q: "What frequency hopping rate does Bluetooth Classic use?", a: "1600 hops per second across 79 channels spaced 1 MHz apart.", diff: "MEDIUM" }
    ]
  },
  {
    id: 17,
    number: "17",
    title: "BLUETOOTH DEVICE DETAILS",
    category: "Short Range & Bluetooth",
    difficulty: "Intermediate",
    estimatedTime: "35 mins",
    shortDesc: "Inspect simulated Bluetooth and BLE device profiles, GATT services, UUIDs, paired connection status, and protocol capabilities.",
    aim: "To inspect detailed hardware and protocol characteristics of discovered Bluetooth devices, analyze Generic Attribute Profile (GATT) services, and simulate device pairing.",
    requirements: [
      "Simulated Bluetooth Device Inspector Interface",
      "GATT Profile Architecture Engine (Services, Characteristics, Descriptors)",
      "Bluetooth Core Specification Version Database (v4.2, v5.0, v5.3)",
      "Simulated Pairing & Key Exchange Module"
    ],
    theory: {
      overview: "Bluetooth devices expose their capabilities through standardized profiles. Bluetooth Low Energy organizes data hierarchically using the Generic Attribute Profile (GATT), consisting of Services identified by 16-bit or 128-bit UUIDs, containing Characteristics and Descriptors.",
      keyPoints: [
        "GATT Hierarchy: Profile -> Service -> Characteristic -> Value & Descriptors.",
        "UUID (Universally Unique Identifier): Standard 16-bit UUIDs (e.g., 0x180D for Heart Rate, 0x180F for Battery Service) or 128-bit custom UUIDs.",
        "Bluetooth Versions: BT 4.2 (IoT data packet length extension), BT 5.0 (2x speed 2 Mbps, 4x range, 8x broadcast capacity), BT 5.3 (periodic advertising enhancement).",
        "Security & Pairing: Secure Simple Pairing (SSP) uses Diffie-Hellman elliptic curve cryptography (Numeric Comparison, Just Works, Passkey Entry)."
      ],
      standards: [
        { std: "GATT Specification", freq: "ATT Protocol", maxRate: "Client/Server Attributes", modulation: "UUID Hierarchy" }
      ]
    },
    topology: {
      type: "GATT Service Architecture",
      nodes: [
        { id: "client", name: "GATT Client (Laptop)", ip: "Master", mac: "Reads / Writes", desc: "Queries services and subscribes to notifications." },
        { id: "server", name: "GATT Server (Device)", ip: "Peripheral", mac: "Hosts Database", desc: "Exposes Heart Rate, Battery, Audio services." }
      ],
      flow: ["Select Device", "Connect Simulation", "Service Discovery (GATT)", "Enumerate UUIDs & Characteristics", "Read / Notify Attribute Values"]
    },
    procedure: [
      "Select a target simulated Bluetooth device from the catalog (e.g. Smart Watch or Wireless Headset).",
      "Click [VIEW DEVICE] to expand the deep inspection panel.",
      "Review core parameters: Device Name, Model, BD_ADDR, Signal RSSI, Battery level, and Bluetooth Core Version.",
      "Click [CONNECT SIMULATION] to simulate pairing and secure channel establishment.",
      "Examine enumerated GATT Services: Battery Service (UUID 0x180F), Device Information (UUID 0x180A), Heart Rate (UUID 0x180D) or Audio Sink (A2DP).",
      "Inspect Characteristic properties: Read, Write, Notify, Indicate.",
      "Simulate reading a live characteristic value (e.g., Battery: 88%, Heart Rate: 72 bpm)."
    ],
    configuration: {
      selectedDevice: "Smart Watch",
      bluetoothVersion: "Bluetooth 5.2 LE",
      address: "F4:F5:DB:77:88:99",
      rssi: -62,
      pairingMethod: "Numeric Comparison (Just Works)"
    },
    expectedOutput: "A comprehensive device specification panel with paired state transitions and interactive GATT service tree explorer.",
    result: "Successfully inspected Bluetooth device architecture, verified GATT services and characteristic UUIDs, and simulated secure device pairing.",
    viva: [
      { q: "What is GATT in Bluetooth Low Energy?", a: "Generic Attribute Profile: defines how BLE devices exchange structured data organized into Services, Characteristics, and Descriptors.", diff: "IMPORTANT" },
      { q: "What is the purpose of a 16-bit vs 128-bit UUID in Bluetooth?", a: "16-bit UUIDs are assigned by the Bluetooth SIG for standard services (e.g. 0x180F for Battery); 128-bit UUIDs are used for custom vendor-proprietary services.", diff: "MEDIUM" },
      { q: "What is the difference between Notify and Indicate in GATT characteristics?", a: "Notify sends data from server to client without requiring an acknowledgment; Indicate requires an explicit application-layer acknowledgment from the client.", diff: "IMPORTANT" }
    ]
  },
  {
    id: 18,
    number: "18",
    title: "BLUETOOTH CHAT",
    category: "Short Range & Bluetooth",
    difficulty: "Intermediate",
    estimatedTime: "35 mins",
    shortDesc: "Simulated peer-to-peer Bluetooth Serial Port Profile (SPP/RFCOMM) chat between LAB LAPTOP and STUDENT PHONE.",
    aim: "To demonstrate serial communication and messaging over simulated Bluetooth links using RFCOMM / Serial Port Profile (SPP) with telemetry monitoring.",
    requirements: [
      "Simulated Two-Device Piconet (Device A: LAB LAPTOP, Device B: STUDENT PHONE)",
      "RFCOMM / L2CAP Protocol Simulator",
      "Dual-Terminal Chat Interface",
      "Live Connection Telemetry (Bytes Sent/Received, RSSI, Link Status)"
    ],
    theory: {
      overview: "Bluetooth Serial Port Profile (SPP) emulates an RS-232 serial cable over the RFCOMM protocol (based on ETSI TS 07.10) running on top of the Logical Link Control and Adaptation Protocol (L2CAP). It enables bidirectional character streaming between paired devices.",
      keyPoints: [
        "RFCOMM Protocol: Provides virtual serial data ports, transport flow control, and multiplexing of up to 30 simultaneous data channels over a single baseband link.",
        "L2CAP Layer: Segments and reassembles higher-layer packets, provides protocol multiplexing, and manages Quality of Service (QoS).",
        "Piconet Structure: One device acts as Master (initiates connection) and the other as Slave; maximum 7 active slaves per piconet.",
        "Educational Simulation: Operates with simulated demo data in the browser; no physical Bluetooth hardware is touched."
      ],
      standards: [
        { std: "RFCOMM / SPP", freq: "2.4 GHz ISM", maxRate: "Up to 2.1 Mbps (EDR)", modulation: "Emulated Serial Stream" }
      ]
    },
    topology: {
      type: "Point-to-Point Bluetooth Link",
      nodes: [
        { id: "laptop", name: "LAB LAPTOP", ip: "Master Node", mac: "B8:27:EB:01:A2:33", desc: "Terminal A transmitting over RFCOMM Channel 1." },
        { id: "phone", name: "STUDENT PHONE", ip: "Slave Node", mac: "44:6D:57:9A:BC:10", desc: "Terminal B receiving and replying." }
      ],
      flow: ["Laptop Input", "RFCOMM Framing", "L2CAP Segmentation", "Simulated RF Transmission", "L2CAP Reassembly", "Phone Display"]
    },
    procedure: [
      "Verify connection status indicator displays 'CONNECTED' between LAB LAPTOP and STUDENT PHONE.",
      "Type a message in the LAB LAPTOP input field (e.g. 'Hello Student, testing Bluetooth RFCOMM link.').",
      "Click [SEND MESSAGE] or hit Enter.",
      "Observe the animated Bluetooth transmission pulse carrying packets across the virtual channel.",
      "Verify instantaneous receipt and display in the STUDENT PHONE chat transcript.",
      "Type a response from the STUDENT PHONE terminal (e.g., 'Received loud and clear, RSSI -58 dBm.').",
      "Observe live telemetry updates: Bytes Sent, Bytes Received, Packets, and Link RSSI.",
      "Test preset quick-reply buttons to observe conversational flow."
    ],
    configuration: {
      masterDevice: "LAB LAPTOP (B8:27:EB:01:A2:33)",
      slaveDevice: "STUDENT PHONE (44:6D:57:9A:BC:10)",
      protocol: "RFCOMM / SPP",
      rfcommChannel: 1,
      linkRssi: -58
    },
    expectedOutput: "A synchronized dual-device messaging interface with animated packet transfer indicators, timestamps, and real-time telemetry counters.",
    result: "Successfully demonstrated peer-to-peer serial chat communication over simulated Bluetooth RFCOMM / SPP protocol stack.",
    viva: [
      { q: "What is RFCOMM and what legacy interface does it emulate?", a: "RFCOMM is a Bluetooth transport protocol that emulates standard RS-232 serial ports over the L2CAP protocol.", diff: "IMPORTANT" },
      { q: "What is a Bluetooth Piconet?", a: "A wireless personal area network formed by one master device and up to 7 active slave devices sharing a common frequency hopping channel.", diff: "EASY" },
      { q: "What role does L2CAP play in the Bluetooth protocol architecture?", a: "Logical Link Control and Adaptation Protocol (L2CAP) provides protocol multiplexing, packet segmentation and reassembly (SAR), and QoS.", diff: "MEDIUM" }
    ]
  },
  {
    id: 19,
    number: "19",
    title: "BLUETOOTH FILE TRANSFER",
    category: "Short Range & Bluetooth",
    difficulty: "Intermediate",
    estimatedTime: "40 mins",
    shortDesc: "Simulate Bluetooth Object Exchange (OBEX) file transfer with chunk-by-chunk progress, transfer speeds, and packet acknowledgments.",
    aim: "To demonstrate the Bluetooth Object Exchange (OBEX) protocol and Object Push Profile (OPP) by simulating binary file transfer, calculating throughput, and tracking packet chunk transmission.",
    requirements: [
      "Simulated Bluetooth OBEX Client (LAB LAPTOP)",
      "Simulated Bluetooth OBEX Server (STUDENT PHONE)",
      "Demo File Repository (PDF notes, firmware binary, signal capture file)",
      "OBEX Packet Chunk Generator and Transfer Progress Engine"
    ],
    theory: {
      overview: "Bluetooth Object Exchange (OBEX) is a high-level binary communication protocol that allows devices to exchange objects (files, vCards, pictures). The Object Push Profile (OPP) defines roles for pushing and pulling objects over an RFCOMM transport channel.",
      keyPoints: [
        "OBEX Operations: CONNECT, PUT (transfers file headers and data chunks), GET, and DISCONNECT.",
        "Packet Chunking: Files are divided into discrete OBEX packet chunks (typically 255 to 64k bytes depending on negotiated MTU).",
        "Throughput Factors: Classic Bluetooth EDR achieves ~2.1 Mbps physical layer rate; application throughput averages 120-200 KB/sec due to headers, hopping, and stop-and-wait ACKs.",
        "Educational Simulation: Operates with simulated files and synthetic progress calculations; no physical file is read or transmitted outside the browser."
      ],
      standards: [
        { std: "Bluetooth OPP / OBEX", freq: "IrDA OBEX / RFCOMM", maxRate: "150 - 250 KB/s real throughput", modulation: "Binary Object Push" }
      ]
    },
    topology: {
      type: "OBEX Push Transfer",
      nodes: [
        { id: "sender", name: "Sender (LAB LAPTOP)", ip: "OBEX Client", mac: "B8:27:EB:01:A2:33", desc: "Pushes file chunks using OBEX PUT commands." },
        { id: "link", name: "Bluetooth Channel", ip: "2.4 GHz RFCOMM", mac: "MTU: 1024 bytes", desc: "Transmits packet payload." },
        { id: "receiver", name: "Receiver (STUDENT PHONE)", ip: "OBEX Server", mac: "44:6D:57:9A:BC:10", desc: "Reassembles chunks and verifies checksum." }
      ],
      flow: ["Select Demo File", "OBEX CONNECT", "OBEX PUT (Name, Length)", "Send Chunks (0% -> 25% -> 50% -> 75% -> 100%)", "OBEX Success (0x20)", "File Saved"]
    },
    procedure: [
      "Select a demo file from the dropdown: 'wireless_notes.pdf' (1.8 MB), 'lab_spec.bin' (512 KB), or 'signal_capture.dat' (3.2 MB).",
      "Review file metadata: File Name, MIME type, Total Bytes, and Target Receiver device.",
      "Click [INITIATE FILE TRANSFER] to begin the simulated OBEX session.",
      "Observe connection establishment and packet chunk transmission: 0% -> 25% -> 50% -> 75% -> 100%.",
      "Monitor real-time simulated transfer speed (e.g. 185 KB/s), elapsed time, and remaining time.",
      "Observe animated packet flows traveling from Laptop across the Bluetooth link into the Phone.",
      "At 100%, verify completion banner: 'FILE TRANSFER COMPLETED' and inspect transfer summary statistics."
    ],
    configuration: {
      selectedFile: "wireless_notes.pdf",
      fileSizeKb: 1840,
      obexMtu: 1024,
      targetDevice: "STUDENT PHONE",
      transferSpeedKbps: 185
    },
    expectedOutput: "An animated progress bar advancing through 25%, 50%, 75%, and 100%, accompanied by dynamic chunk counters, transfer rate meters, and completion confirmation.",
    result: "Successfully simulated Bluetooth OBEX file transfer, evaluated chunk-based transmission mechanisms, and tracked Object Push Profile progress.",
    viva: [
      { q: "What does OBEX stand for and what is its purpose?", a: "Object Exchange; a binary communication protocol that enables peer devices to exchange binary objects like files, contacts, and images.", diff: "EASY" },
      { q: "What is the typical real-world transfer speed of Bluetooth 2.1+EDR file transfer?", a: "Approximately 150 to 250 Kilobytes per second (KB/s).", diff: "MEDIUM" },
      { q: "Which Bluetooth profile is specifically utilized for pushing files between phones and laptops?", a: "Object Push Profile (OPP), which runs on top of OBEX and RFCOMM.", diff: "IMPORTANT" }
    ]
  }
];
