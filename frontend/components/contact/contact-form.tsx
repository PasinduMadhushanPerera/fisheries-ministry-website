"use client"

import { useState } from "react"
import { Send, CheckCircle2, Info, MessageSquare, AlertCircle, Loader2 } from "lucide-react"

import { Container } from "@/components/ui/container"
import { submitContactMessage } from "@/lib/api/contact"
import { useLanguage } from "@/src/contexts/LanguageContext"

interface ContactFormProps {
  departments?: Array<{ id: string | number; name: string }>
  settings?: import("@/lib/api/contact").ApiContactPageSettings
}

const formTranslations = {
  en: {
    fullName: "Full Name",
    fullNamePlaceholder: "e.g. K. A. Perera",
    email: "Email Address",
    emailPlaceholder: "name@example.com",
    telephone: "Telephone Number",
    telephonePlaceholder: "+94 77 123 4567",
    subjectCategory: "Subject Category",
    optional: "Optional",
    selectCategory: "-- Select Category (Optional) --",
    optGeneral: "General Inquiry",
    optLicensing: "Fishing Licensing (DFAR)",
    optAquaculture: "Aquaculture Permits (NAQDA)",
    optHarbor: "Harbor & Infrastructure",
    optRti: "Right to Information (RTI)",
    optMedia: "Media & Press Relations",
    optOther: "Other",
    specifySubject: "Specify Subject",
    specifySubjectPlaceholder: "e.g. Subsidy inquiry, environmental concern...",
    message: "Inquiry Message",
    messagePlaceholder: "Explain your inquiry or request clearly...",
    send: "Send Message",
    sending: "Sending Message...",
    successTitle: "Inquiry Submitted Successfully",
    successDesc: (email: string) =>
      `Thank you for reaching out! Your message has been logged and sent to ${email}. Designated division officers will contact you shortly.`,
    sendAnother: "Send Another Message",
  },
  si: {
    fullName: "සම්පූර්ණ නම",
    fullNamePlaceholder: "උදා: කේ. ඒ. පෙරේරා",
    email: "විද්‍යුත් තැපෑල",
    emailPlaceholder: "name@example.com",
    telephone: "දුරකථන අංකය",
    telephonePlaceholder: "+94 77 123 4567",
    subjectCategory: "විෂය වර්ගය",
    optional: "විකල්ප",
    selectCategory: "-- විෂය වර්ගයක් තෝරන්න (විකල්ප) --",
    optGeneral: "සාමාන්‍ය විමසීම් (General Inquiry)",
    optLicensing: "ධීවර බලපත්‍ර (DFAR)",
    optAquaculture: "ජලජීවී වගා අවසරපත් (NAQDA)",
    optHarbor: "වරාය සහ යටිතල පහසුකම්",
    optRti: "තොරතුරු දැනගැනීමේ අයිතිය (RTI)",
    optMedia: "මාධ්‍ය සහ ප්‍රවෘත්ති සබඳතා",
    optOther: "වෙනත් (Other)",
    specifySubject: "විෂය සඳහන් කරන්න",
    specifySubjectPlaceholder: "උදා: සහනාධාර, පර්යේෂණ හෝ වෙනත් කරුණු...",
    message: "විමසීම් පණිවිඩය",
    messagePlaceholder: "ඔබගේ විමසීම හෝ ඉල්ලීම පැහැදිලිව විස්තර කරන්න...",
    send: "පණිවිඩය යවන්න",
    sending: "පණිවිඩය යවමින් පවතී...",
    successTitle: "ඔබගේ පණිවිඩය සාර්ථකව යොමු කෙරිණි",
    successDesc: (email: string) =>
      `අප හා සම්බන්ධ වීම ගැන ඔබට ස්තුතියි! ඔබගේ පණිවිඩය සටහන් කර ${email} වෙත යවන ලදී. අදාළ අංශයේ නිලධාරීන් විසින් ඔබව ඉක්මනින් සම්බන්ධ කර ගනු ඇත.`,
    sendAnother: "තවත් පණිවිඩයක් යවන්න",
  },
  ta: {
    fullName: "முழுப் பெயர்",
    fullNamePlaceholder: "உதா: கே. ஏ. பெரேரா",
    email: "மின்னஞ்சல் முகவரி",
    emailPlaceholder: "name@example.com",
    telephone: "தொலைபேசி எண்",
    telephonePlaceholder: "+94 77 123 4567",
    subjectCategory: "விடய வகை",
    optional: "விருப்பத்திற்குரியது",
    selectCategory: "-- வகையைத் தேர்ந்தெடுக்கவும் (விருப்பத்திற்குரியது) --",
    optGeneral: "பொதுவான விசாரிப்பு (General Inquiry)",
    optLicensing: "மீன்பிடி உரிமங்கள் (DFAR)",
    optAquaculture: "நீரியல் வளர்ப்பு அனுமதிகள் (NAQDA)",
    optHarbor: "துறைமுகம் மற்றும் உள்கட்டமைப்பு",
    optRti: "தகவல் அறியும் உரிமை (RTI)",
    optMedia: "ஊடக மற்றும் செய்தித் தொடர்புகள்",
    optOther: "மற்றவை (Other)",
    specifySubject: "விடயத்தைக் குறிப்பிடவும்",
    specifySubjectPlaceholder: "உதா: மானியம், ஆராய்ச்சி அல்லது பிற விடயங்கள்...",
    message: "விசாரிப்புச் செய்தி",
    messagePlaceholder: "உங்கள் விசாரிப்பு அல்லது கோரிக்கையை தெளிவாக விளக்கவும்...",
    send: "செய்தியை அனுப்பவும்",
    sending: "செய்தி அனுப்பப்படுகிறது...",
    successTitle: "விசாரிப்பு வெற்றிகரமாகச் சமர்ப்பிக்கப்பட்டது",
    successDesc: (email: string) =>
      `எங்களைத் தொடர்பு கொண்டமைக்கு நன்றி! உங்கள் செய்தி பதிவு செய்யப்பட்டு ${email} இற்கு அனுப்பப்பட்டுள்ளது. நியமிக்கப்பட்ட பிரிவு அதிகாரிகள் விரைவில் உங்களைத் தொடர்புகொள்வார்கள்.`,
    sendAnother: "மற்றொரு செய்தியை அனுப்பவும்",
  },
}

export function ContactForm({ departments, settings }: ContactFormProps) {
  const { language } = useLanguage()
  const tLabels = formTranslations[language] || formTranslations.en

  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [otherSubject, setOtherSubject] = useState("")

  const receiverEmail = settings?.receiver_email || "minfishit@gmail.com"

  const formBadge = settings?.form_badge || "Public Inquiry Form"
  const formTitle = settings?.form_title || "Send Us a Message"
  const formSubtitle = settings?.form_subtitle || "Submit your question, feedback or public inquiry directly to the Ministry staff."
  const guidanceTitle = settings?.form_guidance_title || "Before you submit"
  const guidanceItems = settings?.form_guidance_items && settings.form_guidance_items.length > 0
    ? settings.form_guidance_items
    : [
        "Use your official full name as registered on national identification",
        "Provide a valid email address for official response delivery",
        "Choose the correct subject division for faster processing",
        "Explain your inquiry clearly with any relevant registration numbers",
      ]

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    telephone: "",
    subject: "",
    departmentName: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage(null)

    let finalSubject = "General Inquiry"
    if (formData.subject === "Other") {
      finalSubject = otherSubject.trim() ? `Other: ${otherSubject.trim()}` : "Other"
    } else if (formData.subject.trim()) {
      finalSubject = formData.subject.trim()
    }

    try {
      const res = await submitContactMessage({
        name: formData.fullName,
        email: formData.email,
        phone: formData.telephone,
        subject: finalSubject,
        department_name: formData.departmentName,
        message: formData.message,
      })

      if (res.success) {
        setSubmitted(true)
        setFormData({
          fullName: "",
          email: "",
          telephone: "",
          subject: "",
          departmentName: "",
          message: "",
        })
        setOtherSubject("")
      } else {
        setErrorMessage(res.message || "Failed to send your inquiry. Please try again.")
      }
    } catch (err) {
      console.error("Error submitting contact form:", err)
      setErrorMessage("An unexpected error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact-form" className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200" aria-label="Submit Public Inquiry">
      <Container>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 lg:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Column: Guidance Box */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-[#256B29] border border-emerald-200">
                  <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{formBadge}</span>
                </span>
                <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {formTitle}
                </h2>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {formSubtitle}
                </p>
              </div>

              {/* Green Guidance Box */}
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-5 space-y-3">
                <div className="flex items-center gap-2 text-[#256B29] font-bold text-sm">
                  <Info className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{guidanceTitle}</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-700 font-medium list-disc pl-5 leading-relaxed">
                  {guidanceItems.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="lg:col-span-7">
              {submitted ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/90 p-8 text-center space-y-4">
                  <CheckCircle2 className="h-14 w-14 text-[#256B29] mx-auto animate-bounce" aria-hidden="true" />
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">{tLabels.successTitle}</h3>
                  <p className="text-sm text-slate-700 max-w-md mx-auto leading-relaxed">
                    {tLabels.successDesc(receiverEmail)}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false)
                      setFormData({
                        fullName: "",
                        email: "",
                        telephone: "",
                        subject: "",
                        departmentName: "",
                        message: "",
                      })
                      setOtherSubject("")
                    }}
                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#256B29] px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#1b4d1d] cursor-pointer"
                  >
                    <span>{tLabels.sendAnother}</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-bold text-red-700 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="fullName" className="block text-xs font-bold text-slate-700 mb-1">
                        {tLabels.fullName} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder={tLabels.fullNamePlaceholder}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition focus:border-[#256B29] focus:bg-white focus:outline-none"
                      />
                    </div>

                    {/* Email Address */}
                    <div>
                      <label htmlFor="email" className="block text-xs font-bold text-slate-700 mb-1">
                        {tLabels.emailAddress} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={tLabels.emailPlaceholder}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition focus:border-[#256B29] focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Telephone */}
                    <div>
                      <label htmlFor="telephone" className="block text-xs font-bold text-slate-700 mb-1">
                        {tLabels.telephone} <span className="text-slate-400 font-normal text-[11px]">({tLabels.optional})</span>
                      </label>
                      <input
                        type="tel"
                        id="telephone"
                        value={formData.telephone}
                        onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                        placeholder={tLabels.telephonePlaceholder}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition focus:border-[#256B29] focus:bg-white focus:outline-none"
                      />
                    </div>

                    {/* Subject Dropdown */}
                    <div>
                      <label htmlFor="subject" className="block text-xs font-bold text-slate-700 mb-1">
                        {tLabels.subjectCategory} <span className="text-slate-400 font-normal text-[11px]">({tLabels.optional})</span>
                      </label>
                      <select
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-2.5 text-sm text-slate-900 transition focus:border-[#256B29] focus:bg-white focus:outline-none cursor-pointer"
                      >
                        <option value="">{tLabels.selectCategory}</option>
                        <option value="General Inquiry">{tLabels.optGeneral}</option>
                        <option value="Fishing Licensing">{tLabels.optLicensing}</option>
                        <option value="Aquaculture Permits">{tLabels.optAquaculture}</option>
                        <option value="Harbor & Infrastructure">{tLabels.optHarbor}</option>
                        <option value="Right to Information">{tLabels.optRti}</option>
                        <option value="Media & Press">{tLabels.optMedia}</option>
                        <option value="Other">{tLabels.optOther}</option>
                      </select>

                      {/* Custom Subject field when 'Other' is chosen */}
                      {formData.subject === "Other" && (
                        <div className="mt-2.5 transition-all duration-200">
                          <label htmlFor="otherSubject" className="block text-xs font-semibold text-slate-600 mb-1">
                            {tLabels.specifySubject} <span className="text-slate-400 font-normal text-[11px]">({tLabels.optional})</span>
                          </label>
                          <input
                            type="text"
                            id="otherSubject"
                            value={otherSubject}
                            onChange={(e) => setOtherSubject(e.target.value)}
                            placeholder={tLabels.specifySubjectPlaceholder}
                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 placeholder-slate-400 transition focus:border-[#256B29] focus:outline-none shadow-xs"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-bold text-slate-700 mb-1">
                      {tLabels.message} <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={tLabels.messagePlaceholder}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition focus:border-[#256B29] focus:bg-white focus:outline-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex min-h-[44px] w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#256B29] px-7 py-3 font-bold text-white transition hover:bg-[#1b4d1d] disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                        <span>{tLabels.sending}</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" aria-hidden="true" />
                        <span>{tLabels.send}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}