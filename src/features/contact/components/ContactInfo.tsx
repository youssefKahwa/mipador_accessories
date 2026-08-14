import {
  MessageCircle,
  Mail,
  MapPin,
} from "lucide-react";
const ContactInfo: React.FC = () => (
  <div className="space-y-10">
    <div className="space-y-6">
      <div className="flex items-center gap-6 group cursor-pointer">
        <div className="w-12 h-12 bg-clay/5 rounded-xl flex items-center justify-center text-clay">
          <MessageCircle size={24} />
        </div>
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-taupe">
            WhatsApp
          </h4>
          <p className="font-semibold text-clay">+212 612918900</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="w-12 h-12 bg-clay/5 rounded-xl flex items-center justify-center text-clay">
          <Mail size={20} />
        </div>
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-taupe">
            Email
          </h4>
          <p className="font-semibold text-clay">mipadorofficial@gmail.com</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="w-12 h-12 bg-clay/5 rounded-xl flex items-center justify-center text-clay">
          <MapPin size={20} />
        </div>
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-taupe">
            Studio
          </h4>
          <p className="font-semibold text-clay">Morocco, Casablanca</p>
        </div>
      </div>
    </div>

  </div>
);
export default ContactInfo;
