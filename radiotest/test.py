import meshtastic
import meshtastic.serial_interface
import time

NODE_ID = "!1fa05434"

def on_receive(packet):
    if 'decoded' in pakcet:
        data = packet['decoded'].get("text","")
        from_id = packet.get('fromID','')
        if from_id == NODE_ID:
            print(f"received GPS data from {NODE_ID}: {data}")


def main():
    print("Initialising")
    try:
        interface = meshtastic.serial_interface.SerialInterface(devPath="/dev/serial0")
        interface.onReceive = on_receive

        interface.sendText("GPS_REQUEST", destinationId=NODE_ID)

        time.sleep(10)


    except KeyboardInterrupt:
        print("Exiting")
    
    finally:
        interface.close()


if __name__ == "__main__":
    main()
