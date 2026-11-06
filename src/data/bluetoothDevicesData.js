// Simulated Bluetooth Devices Dataset for Experiments 16 and 17
export const DEMO_BLUETOOTH_DEVICES = [
  {
    id: "dev-phone",
    name: "Student Phone",
    type: "Smartphone",
    address: "44:6D:57:9A:BC:10",
    rssi: -54,
    status: "Discoverable",
    paired: false,
    version: "Bluetooth 5.3 (Dual Mode)",
    battery: 84,
    classOfDevice: "0x5A020C (Smartphone / Telephony)",
    txPower: "+8 dBm",
    services: [
      { uuid: "0x1105", name: "Object Push Profile (OPP)", type: "Classic Profile", desc: "Supports OBEX file reception." },
      { uuid: "0x1101", name: "Serial Port Profile (SPP / RFCOMM)", type: "Classic Profile", desc: "Enables serial text chat." },
      { uuid: "0x180F", name: "Battery Service", type: "GATT Primary", desc: "Reports battery percentage (84%)." },
      { uuid: "0x180A", name: "Device Information", type: "GATT Primary", desc: "Model: Galaxy Lab-Ed, Mfr: Samsung." }
    ]
  },
  {
    id: "dev-laptop",
    name: "Lab Laptop",
    type: "Computer",
    address: "B8:27:EB:01:A2:33",
    rssi: -42,
    status: "Connected (Master)",
    paired: true,
    version: "Bluetooth 5.2 BR/EDR/LE",
    battery: 100,
    classOfDevice: "0x38010C (Laptop / Workstation)",
    txPower: "+10 dBm",
    services: [
      { uuid: "0x1101", name: "Serial Port Profile (SPP)", type: "Classic Profile", desc: "Local RFCOMM Chat Server." },
      { uuid: "0x1106", name: "File Transfer Profile (FTP)", type: "Classic Profile", desc: "Local OBEX Client Sender." },
      { uuid: "0x1800", name: "Generic Access", type: "GATT Primary", desc: "Device Name & Appearance." },
      { uuid: "0x1801", name: "Generic Attribute", type: "GATT Primary", desc: "Service Changed Indication." }
    ]
  },
  {
    id: "dev-headset",
    name: "Wireless Headset",
    type: "Audio Device",
    address: "00:1B:66:33:44:55",
    rssi: -68,
    status: "Paired (Standby)",
    paired: true,
    version: "Bluetooth 5.0 Classic",
    battery: 70,
    classOfDevice: "0x200404 (Audio / Video Headset)",
    txPower: "+4 dBm",
    services: [
      { uuid: "0x110B", name: "Audio Sink (A2DP)", type: "Classic Profile", desc: "High quality stereo audio playback." },
      { uuid: "0x110E", name: "A/V Remote Control (AVRCP)", type: "Classic Profile", desc: "Play/Pause/Skip media controls." },
      { uuid: "0x111E", name: "Handsfree Profile (HFP)", type: "Classic Profile", desc: "Voice calls & microphone uplink." },
      { uuid: "0x180F", name: "Battery Service", type: "GATT Primary", desc: "Level: 70%." }
    ]
  },
  {
    id: "dev-watch",
    name: "Smart Watch",
    type: "Wearable",
    address: "F4:F5:DB:77:88:99",
    rssi: -62,
    status: "Advertising",
    paired: false,
    version: "Bluetooth 5.1 LE Only",
    battery: 92,
    classOfDevice: "0x7A0704 (Wearable Wristwatch)",
    txPower: "0 dBm",
    services: [
      { uuid: "0x180D", name: "Heart Rate Service (HRS)", type: "GATT Primary", desc: "Real-time pulse rate measurement (74 bpm)." },
      { uuid: "0x180F", name: "Battery Service", type: "GATT Primary", desc: "Level: 92%." },
      { uuid: "0x180A", name: "Device Information", type: "GATT Primary", desc: "Model: PulseTrack Pro, FW: 3.1.2." },
      { uuid: "0x1812", name: "Human Interface Device (HID)", type: "GATT Primary", desc: "Gesture and button triggers." }
    ]
  },
  {
    id: "dev-speaker",
    name: "Lab Audio Speaker",
    type: "Audio Device",
    address: "70:88:6B:AA:BB:CC",
    rssi: -75,
    status: "Discoverable",
    paired: false,
    version: "Bluetooth 4.2",
    battery: 45,
    classOfDevice: "0x200414 (Loudspeaker)",
    txPower: "+6 dBm",
    services: [
      { uuid: "0x110B", name: "Audio Sink (A2DP)", type: "Classic Profile", desc: "Bluetooth stereo loudspeaker." },
      { uuid: "0x110C", name: "A/V Remote Target", type: "Classic Profile", desc: "Volume sync control." }
    ]
  }
];
