import React, { useState } from "react";
import { ShoppingCart, Check, Loader, Banknote, CreditCard } from "lucide-react";
import { useTranslation } from "react-i18next";
import { WHATSAPP_NUMBER } from "../../../../config/whatsapp";

export interface OrderLine {
  name: string;
  collection: string;
  price: number;
  quantity: number;
}

interface OrderFormProps {
  lines: OrderLine[];
  total: number;
  onSuccess?: () => void;
  engravingAvailable?: boolean;
  selectedColor?: string;
}

interface FieldProps {
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  error?: string;
  onChange: (val: string) => void;
}

const Field: React.FC<FieldProps> = ({
  label, placeholder, type = "text", value, error, onChange,
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[10px] font-black uppercase tracking-widest text-ink/65">
      {label}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full bg-frost rounded-xl px-4 py-3 text-sm text-ink placeholder-ink/25 outline-none border transition-all ${
        error
          ? "border-red-300"
          : "border-ink/10 focus:border-ink/30"
      }`}
    />
    {error && (
      <p className="text-[9px] text-red-400 font-black uppercase tracking-widest">
        {error}
      </p>
    )}
  </div>
);

// ── Payment method option card ─────────────────────────────
const PaymentOption: React.FC<{
  selected: boolean;
  disabled?: boolean;
  icon: React.ReactNode;
  label: string;
  desc: string;
  badge?: string;
  onClick: () => void;
}> = ({ selected, disabled, icon, label, desc, badge, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={`relative flex items-center gap-3 w-full rounded-xl border px-4 py-3 text-left transition-all duration-200 ${
      disabled
        ? "opacity-40 cursor-not-allowed bg-frost border-ink/8"
        : selected
        ? "border-ink bg-ink/5 shadow-[0_0_0_1px_var(--color-ink)]"
        : "border-ink/15 bg-frost hover:border-ink/30"
    }`}
  >
    <div className={`shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${
      selected ? "bg-chrome text-white" : "bg-surface text-ink/65"
    }`}>
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className={`text-xs font-black uppercase tracking-widest ${
        selected ? "text-ink" : "text-ink/65"
      }`}>
        {label}
      </p>
      <p className="text-[10px] text-ink/65 font-light mt-0.5">{desc}</p>
    </div>
    {!disabled && (
      <div className={`shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
        selected ? "border-ink bg-chrome" : "border-ink/25"
      }`}>
        {selected && <Check size={8} className="text-white" strokeWidth={3} />}
      </div>
    )}
    {badge && (
      <span className="absolute top-2 right-2 px-2 py-0.5 bg-champagne/15 text-champagne text-[8px] font-black uppercase tracking-widest rounded-lg">
        {badge}
      </span>
    )}
  </button>
);

// ── Main form ──────────────────────────────────────────────
const OrderForm: React.FC<OrderFormProps> = ({ lines, total, onSuccess, engravingAvailable, selectedColor }) => {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", phone: "", city: "", address: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [wantEngraving, setWantEngraving] = useState(false);
  const [engraving, setEngraving] = useState("");
  // CoD is the only active option; "online" is a B2 placeholder
  const [paymentMethod] = useState<"cod" | "online">("cod");

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim())    e.name    = t("order.required");
    if (!form.phone.trim())   e.phone   = t("order.required");
    if (!form.city.trim())    e.city    = t("order.required");
    if (!form.address.trim()) e.address = t("order.required");
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const setField = (key: keyof typeof form) => (val: string) => {
    setForm((f) => ({ ...f, [key]: val }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: "" }));
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setSending(true);

    const productLines = lines
      .map((l) => `• ${l.name} (${l.collection}) × ${l.quantity} — ${(l.price * l.quantity).toLocaleString()} MAD`)
      .join("\n");

    const colorLine = selectedColor ? `Colorway: ${selectedColor}\n` : "";
    const engravingLine =
      engravingAvailable && wantEngraving && engraving.trim()
        ? `Engraving: "${engraving.trim()}"\n`
        : "";

    const message =
`Hello Mipador Accessories,

I would like to place an order.

──────────────────
Name: ${form.name}
Phone: ${form.phone}
City: ${form.city}
Address: ${form.address}
Payment: ${paymentMethod === "cod" ? t("order.cod") : t("order.onlinePayment")}
${colorLine}${engravingLine}──────────────────

Order:
${productLines}

Total: ${total.toLocaleString()} MAD

Please confirm availability. Thank you.`;

    setTimeout(() => {
      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
        "_blank"
      );
      setSending(false);
      setSent(true);
      if (onSuccess) onSuccess();
    }, 600);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-ink/8 flex items-center justify-center">
          <Check size={20} className="text-ink" />
        </div>
        <div>
          <p className="text-sm font-black text-ink tracking-tight">
            {t("order.successTitle")}
          </p>
          <p className="text-xs text-ink/65 mt-1 font-light">
            {t("order.successBody")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">

      {/* Payment method selector */}
      <div className="flex flex-col gap-2">
        <p className="text-[10px] font-black uppercase tracking-widest text-ink/65">
          {t("order.paymentMethod")}
        </p>
        <PaymentOption
          selected={paymentMethod === "cod"}
          icon={<Banknote size={15} />}
          label={t("order.cod")}
          desc={t("order.codDesc")}
          onClick={() => {/* CoD is always active */}}
        />
        {/* TODO B2: wire up payment gateway (Stripe / CMI / PayZone) — swap disabled for real handler */}
        <PaymentOption
          selected={false}
          disabled
          icon={<CreditCard size={15} />}
          label={t("order.onlinePayment")}
          desc={t("order.codDesc")}
          badge={t("order.onlineSoon")}
          onClick={() => {}}
        />
      </div>

      {/* Contact fields */}
      <div className="grid grid-cols-2 gap-3">
        <Field
          label={t("order.fullName")} placeholder={t("order.namePlaceholder")}
          value={form.name} error={errors.name} onChange={setField("name")}
        />
        <Field
          label={t("order.phone")} placeholder={t("order.phonePlaceholder")} type="tel"
          value={form.phone} error={errors.phone} onChange={setField("phone")}
        />
        <Field
          label={t("order.city")} placeholder={t("order.cityPlaceholder")}
          value={form.city} error={errors.city} onChange={setField("city")}
        />
        <Field
          label={t("order.address")} placeholder={t("order.addressPlaceholder")}
          value={form.address} error={errors.address} onChange={setField("address")}
        />
      </div>

      {/* Free engraving */}
      {engravingAvailable && (
        <div className="flex flex-col gap-2 bg-champagne/8 border border-champagne/20 rounded-xl p-3.5">
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={wantEngraving}
              onChange={(e) => setWantEngraving(e.target.checked)}
              className="w-4 h-4 accent-ink"
            />
            <span className="text-xs font-black uppercase tracking-wider text-ink">
              {t("order.engravingOffer")}
            </span>
          </label>
          {wantEngraving && (
            <input
              type="text"
              maxLength={20}
              value={engraving}
              onChange={(e) => setEngraving(e.target.value)}
              placeholder={t("order.engravingPlaceholder")}
              className="w-full bg-surface rounded-lg px-3.5 py-2.5 text-sm text-ink placeholder-ink/30 outline-none border border-ink/10 focus:border-ink/30 transition-all"
            />
          )}
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={sending}
        className="w-full bg-chrome text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-chrome-light active:scale-95 transition-all disabled:opacity-60"
      >
        {sending ? (
          <><Loader size={13} className="animate-spin" /> {t("order.sending")}</>
        ) : (
          <><ShoppingCart size={13} /> {t("order.submit", { total: total.toLocaleString() })}</>
        )}
      </button>

      <p className="text-center text-[9px] text-ink/65 uppercase tracking-widest">
        {t("order.disclaimer")}
      </p>
    </div>
  );
};

export default OrderForm;
