// Simulated 802.11 Beacon Frames Dataset for Experiment 14
export const DEMO_BEACON_FRAMES = [
  {
    id: "frame-1",
    timestamp: "0.102400s",
    tsfMicroseconds: "145829104820",
    bssid: "00:14:22:01:23:45",
    ssid: "College_WiFi",
    channel: 6,
    frequencyMhz: 2437,
    signalDbm: -52,
    frameType: "Management (0x00)",
    frameSubtype: "Beacon (0x08)",
    duration: 0,
    seqNumber: 1422,
    beaconIntervalTU: 100,
    capabilities: {
      ess: true,
      ibss: false,
      privacy: true,
      shortPreamble: true,
      spectrumMgmt: false,
      shortSlotTime: true
    },
    informationElements: [
      { id: 0, name: "SSID", length: 12, value: "College_WiFi", hex: "43 6f 6c 6c 65 67 65 5f 57 69 46 69" },
      { id: 1, name: "Supported Rates", length: 8, value: "1.0, 2.0, 5.5, 11.0, 6.0, 9.0, 12.0, 24.0 [Mbit/sec]", hex: "82 84 8b 96 0c 12 18 30" },
      { id: 3, name: "DS Parameter Set", length: 1, value: "Current Channel: 6", hex: "06" },
      { id: 48, name: "RSN Information (WPA2)", length: 20, value: "Auth: PSK / 802.1X, Cipher: AES-CCMP", hex: "01 00 00 0f ac 04 01 00 00 0f ac 04 01 00 00 0f ac 02 00 00" },
      { id: 45, name: "HT Capabilities (802.11n)", length: 26, value: "40 MHz Channel Capable, Short GI, MIMO 2x2", hex: "2d 1a 0c 01 1b ff 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00" }
    ]
  },
  {
    id: "frame-2",
    timestamp: "0.204800s",
    tsfMicroseconds: "145829207220",
    bssid: "70:81:05:44:99:A1",
    ssid: "Lab_WiFi",
    channel: 36,
    frequencyMhz: 5180,
    signalDbm: -45,
    frameType: "Management (0x00)",
    frameSubtype: "Beacon (0x08)",
    duration: 0,
    seqNumber: 894,
    beaconIntervalTU: 100,
    capabilities: {
      ess: true,
      ibss: false,
      privacy: true,
      shortPreamble: true,
      spectrumMgmt: true,
      shortSlotTime: true
    },
    informationElements: [
      { id: 0, name: "SSID", length: 8, value: "Lab_WiFi", hex: "4c 61 62 5f 57 69 46 69" },
      { id: 1, name: "Supported Rates", length: 8, value: "6.0, 9.0, 12.0, 18.0, 24.0, 36.0, 48.0, 54.0 [Mbit/sec]", hex: "0c 12 18 24 30 48 60 6c" },
      { id: 3, name: "DS Parameter Set", length: 1, value: "Current Channel: 36", hex: "24" },
      { id: 48, name: "RSN Information (WPA3/WPA2)", length: 22, value: "Auth: SAE (WPA3-Personal) + PSK, Cipher: AES-CCMP", hex: "01 00 00 0f ac 04 01 00 00 0f ac 04 02 00 00 0f ac 08 00 0f ac 02" },
      { id: 191, name: "VHT Capabilities (802.11ac)", length: 12, value: "80 MHz Capable, MU-MIMO RX, 256-QAM", hex: "bf 0c 91 79 80 33 fa ff 00 00 fa ff" }
    ]
  },
  {
    id: "frame-3",
    timestamp: "0.307200s",
    tsfMicroseconds: "145829309620",
    bssid: "CC:44:88:99:00:11",
    ssid: "Guest_WiFi",
    channel: 1,
    frequencyMhz: 2412,
    signalDbm: -78,
    frameType: "Management (0x00)",
    frameSubtype: "Beacon (0x08)",
    duration: 0,
    seqNumber: 3105,
    beaconIntervalTU: 100,
    capabilities: {
      ess: true,
      ibss: false,
      privacy: false, // Open
      shortPreamble: false,
      spectrumMgmt: false,
      shortSlotTime: true
    },
    informationElements: [
      { id: 0, name: "SSID", length: 10, value: "Guest_WiFi", hex: "47 75 65 73 74 5f 57 69 46 69" },
      { id: 1, name: "Supported Rates", length: 4, value: "1.0, 2.0, 5.5, 11.0 [Mbit/sec]", hex: "82 84 8b 96" },
      { id: 3, name: "DS Parameter Set", length: 1, value: "Current Channel: 1", hex: "01" },
      { id: 11, name: "QBSS Load Element", length: 5, value: "Station Count: 14, Channel Utilization: 32%", hex: "0b 05 0e 00 52 00 00" }
    ]
  },
  {
    id: "frame-4",
    timestamp: "0.409600s",
    tsfMicroseconds: "145829412020",
    bssid: "E8:65:D4:AA:77:21",
    ssid: "Student_Network",
    channel: 11,
    frequencyMhz: 2462,
    signalDbm: -64,
    frameType: "Management (0x00)",
    frameSubtype: "Beacon (0x08)",
    duration: 0,
    seqNumber: 4210,
    beaconIntervalTU: 100,
    capabilities: {
      ess: true,
      ibss: false,
      privacy: true,
      shortPreamble: true,
      spectrumMgmt: false,
      shortSlotTime: true
    },
    informationElements: [
      { id: 0, name: "SSID", length: 15, value: "Student_Network", hex: "53 74 75 64 65 6e 74 5f 4e 65 74 77 6f 72 6b" },
      { id: 1, name: "Supported Rates", length: 8, value: "6.0, 9.0, 12.0, 18.0, 24.0, 36.0, 48.0, 54.0 [Mbit/sec]", hex: "0c 12 18 24 30 48 60 6c" },
      { id: 3, name: "DS Parameter Set", length: 1, value: "Current Channel: 11", hex: "0b" },
      { id: 48, name: "RSN Information (WPA2)", length: 20, value: "Auth: WPA2-Enterprise (802.1X), Cipher: AES-CCMP", hex: "01 00 00 0f ac 04 01 00 00 0f ac 01 01 00 00 0f ac 02 00 00" }
    ]
  },
  {
    id: "frame-5",
    timestamp: "0.512000s",
    tsfMicroseconds: "145829514420",
    bssid: "AC:7F:3E:22:11:00",
    ssid: "IoT_Lab",
    channel: 149,
    frequencyMhz: 5745,
    signalDbm: -70,
    frameType: "Management (0x00)",
    frameSubtype: "Beacon (0x08)",
    duration: 0,
    seqNumber: 640,
    beaconIntervalTU: 100,
    capabilities: {
      ess: true,
      ibss: false,
      privacy: true,
      shortPreamble: true,
      spectrumMgmt: true,
      shortSlotTime: true
    },
    informationElements: [
      { id: 0, name: "SSID", length: 7, value: "IoT_Lab", hex: "49 6f 54 5f 4c 61 62" },
      { id: 1, name: "Supported Rates", length: 8, value: "6.0, 12.0, 24.0 [Mbit/sec]", hex: "0c 18 30" },
      { id: 3, name: "DS Parameter Set", length: 1, value: "Current Channel: 149", hex: "95" },
      { id: 48, name: "RSN Information (WPA3-Enterprise)", length: 24, value: "Auth: CNSA 192-bit Suite B, Cipher: GCMP-256", hex: "01 00 00 0f ac 09 01 00 00 0f ac 09 01 00 00 0f ac 02 00 00" }
    ]
  }
];
