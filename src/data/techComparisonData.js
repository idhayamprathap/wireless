// Technology Comparison Matrix for WLAN, CDMA, Bluetooth, OFDM, TCP, UDP
export const TECH_COMPARISONS = [
  {
    tech: "WLAN (Wi-Fi 6 / 802.11ax)",
    category: "Wireless LAN",
    range: "35 - 100 meters (Indoor/Outdoor)",
    dataRate: "Up to 9.6 Gbps (160 MHz, 1024-QAM)",
    power: "Moderate to High (100 - 500 mW)",
    application: "High-speed campus, enterprise, and home broadband access",
    advantage: "High throughput, wide backward compatibility, multi-user OFDMA",
    typicalUsage: "Laptops, smartphones, 4K/8K video streaming, campus intranet",
    freqBand: "2.4 GHz, 5 GHz, 6 GHz",
    color: "#00f2fe"
  },
  {
    tech: "CDMA (Spread Spectrum)",
    category: "Cellular & Multiple Access",
    range: "1 - 10 kilometers (Macrocell)",
    dataRate: "153 kbps (1xRTT) - 3.1 Mbps (EV-DO)",
    power: "Dynamic Power Control (1 mW - 500 mW)",
    application: "2G/3G Cellular voice and mobile packet data",
    advantage: "Soft capacity limit, soft handoffs, resistance to multipath fading",
    typicalUsage: "Legacy cellular networks, military anti-jamming communication, GPS satellites",
    freqBand: "800 MHz, 1900 MHz",
    color: "#8b5cf6"
  },
  {
    tech: "Bluetooth (v5.3 BR/EDR & BLE)",
    category: "Short-Range Wireless WPAN",
    range: "10 - 200 meters (Class 1 / LE Coded)",
    dataRate: "1 - 3 Mbps (Classic) / 2 Mbps (BLE)",
    power: "Ultra Low (0.01 - 10 mW in BLE)",
    application: "Personal Area Networks (PAN), wearables, audio streaming",
    advantage: "Low power draw, fast coin-cell operation, adaptive frequency hopping (AFH)",
    typicalUsage: "Wireless headphones, smartwatches, IoT medical sensors, smart home beacons",
    freqBand: "2.402 - 2.480 GHz ISM",
    color: "#3b82f6"
  },
  {
    tech: "OFDM (Multi-Carrier Modulation)",
    category: "Physical Layer Modulation",
    range: "System Dependent (Local to Cell Scale)",
    dataRate: "Scalable (Tens of Mbps to 10+ Gbps)",
    power: "Requires High Dynamic Range Linear Amplifiers",
    application: "Core PHY layer of Wi-Fi 4/5/6, 4G LTE, 5G NR, DVB-T",
    advantage: "Zero Inter-Symbol Interference via Cyclic Prefix, high spectral efficiency",
    typicalUsage: "High-speed digital broadcast, 5G NR base stations, Wi-Fi routers",
    freqBand: "Sub-6 GHz, Millimeter Wave (24-100 GHz)",
    color: "#10b981"
  },
  {
    tech: "TCP (Transmission Control Protocol)",
    category: "Transport Layer (Connection-Oriented)",
    range: "Global End-to-End Routing (IP Layer)",
    dataRate: "Limited by link MTU, RTT & TCP congestion window",
    power: "N/A (Software Protocol)",
    application: "Reliable byte-stream transfer requiring zero data loss",
    advantage: "3-Way Handshake, ordered delivery, ACK verification, sliding window flow control",
    typicalUsage: "Web browsing (HTTPS), secure shell (SSH), email (SMTP/IMAP), file transfer",
    freqBand: "Layer 4 Protocol (IP over any PHY)",
    color: "#f59e0b"
  },
  {
    tech: "UDP (User Datagram Protocol)",
    category: "Transport Layer (Connectionless)",
    range: "Global End-to-End Routing (IP Layer)",
    dataRate: "Full line rate (no congestion backoff by default)",
    power: "Minimal CPU overhead (8-byte header)",
    application: "Low-latency, delay-sensitive, or broadcast/multicast services",
    advantage: "Zero connection handshake delay, minimal header overhead, lightweight",
    typicalUsage: "DNS queries, VoIP calls, live video streaming, multiplayer games, DHCP",
    freqBand: "Layer 4 Protocol (IP over any PHY)",
    color: "#f97316"
  }
];
