import {
  MessageCircle,
  Mail,
  MapPin,
} from "lucide-react";
import { WHATSAPP_NUMBER } from "../../../config/whatsapp";

const displayNumber = `+${WHATSAPP_NUMBER.slice(0, 3)} ${WHATSAPP_NUMBER.slice(3, 6)} ${WHATSAPP_NUMBER.slice(6, 9)} ${WHATSAPP_NUMBER.slice(9)}`;

const ContactInfo: React.FC = () => (
  <div className="space-y-10">
    <div className="space-y-6">
      <div className="flex items-center gap-6 group cursor-pointer">
        <div className="w-12 h-12 bg-sapphire-deep/5 rounded-xl flex items-center justify-center text-sapphire-deep">
          <MessageCircle size={24} />
        </div>
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate">
            WhatsApp
          </h4>
          <p className="font-semibold text-sapphire-deep">{displayNumber}</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="w-12 h-12 bg-sapphire-deep/5 rounded-xl flex items-center justify-center text-sapphire-deep">
          <Mail size={20} />
        </div>
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate">
            Email
          </h4>
          <p className="font-semibold text-sapphire-deep">mipadorofficial@gmail.com</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="w-12 h-12 bg-sapphire-deep/5 rounded-xl flex items-center justify-center text-sapphire-deep">
          <MapPin size={20} />
        </div>
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate">
            Studio
          </h4>
          <p className="font-semibold text-sapphire-deep">Morocco, Casablanca</p>
        </div>
      </div>
    </div>

  </div>
);
export default ContactInfo;
