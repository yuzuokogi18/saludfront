type WebSocketListener = (data: string) => void;

export class WebSocketService {
  private socket: WebSocket | null = null;
  private listeners: WebSocketListener[] = [];

  constructor() {
    this.connect();
  }

  private connect() {
    this.socket = new WebSocket("ws://54.89.252.220:8081/cases/");

    this.socket.onopen = () => {
      console.log("Conexión WebSocket establecida");
    };

    this.socket.onmessage = (event) => {
      console.log("Mensaje recibido del servidor:", event.data);  // Log para verificar los mensajes
      this.listeners.forEach((listener) => listener(event.data));
    };

    this.socket.onerror = (error) => {
      console.error("Error en WebSocket:", error);
    };

    this.socket.onclose = () => {
      console.log("Conexión WebSocket cerrada. Intentando reconectar...");
      setTimeout(() => this.connect(), 3000); // Intentar reconectar después de 3 segundos
    };
  }

  // Método para registrar un listener
  onNewCase(listener: WebSocketListener) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.listeners.push(listener);
      console.log("Listener de WebSocket registrado");  // Log para confirmar que el listener fue agregado
    } else {
      console.error("WebSocket no está abierto.");
    }
  }

  // Método para enviar un mensaje al servidor
  sendMessage(message: string) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    } else {
      console.error("WebSocket no está abierto.");
    }
  }

  // Método para cerrar la conexión
  closeConnection() {
    if (this.socket) {
      this.socket.close();
    }
  }
}

const webSocketService = new WebSocketService();
export default webSocketService;
