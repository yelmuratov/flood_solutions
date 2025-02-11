"use client";
import Image from "next/image";
import { useState, FormEvent } from "react";

const Hero: React.FC = () => {
  const [phone, setPhone] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  // Regex for phone number validation (Accepts numbers, can start with +)
  const phoneRegex = /^[+]?[0-9]{9,15}$/;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!phone.trim()) {
      setMessage("❌ Iltimos, telefon raqamingizni kiriting!");
      return;
    }

    if (!phoneRegex.test(phone)) {
      setMessage("❌ Noto‘g‘ri telefon raqami! Iltimos, to‘g‘ri formatda kiriting.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/sendPhone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("✅ Telefon raqami muvaffaqiyatli yuborildi!");
        setPhone("");
      } else {
        setMessage(`❌ Xatolik: ${result.error}`);
      }
    } catch (error) {
      setMessage("❌ Server bilan bog'liq xatolik!");
    }

    setLoading(false);
  };

  return (
    <>
      <section className="overflow-hidden pb-20 pt-35 md:pt-40 xl:pb-25 xl:pt-46">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="flex lg:items-center lg:gap-8 xl:gap-32.5">
            <div className="md:w-1/2">
              <h4 className="mb-4.5 text-lg font-medium text-black dark:text-white">
                🚀 FLOOD Solutions - Innovatsion IT Xizmatlar
              </h4>
              <h1 className="mb-5 pr-16 text-3xl font-bold text-black dark:text-white xl:text-hero">
                Biznesingizni Raqamli Transformatsiya Qiling!
              </h1>
              <p>
                FLOOD Solutions - veb-saytlar, mobil ilovalar, CRM, ERP, sun’iy intellekt va Telegram botlar kabi ilg‘or IT xizmatlarini taqdim etadi.
                Biznesingizni yangi bosqichga olib chiqishga yordam beramiz!
              </p>

              <div className="mt-10">
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-wrap gap-5">
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      type="text"
                      placeholder="Telefon raqamingizni kiriting"
                      className="rounded-full border border-stroke px-6 py-2.5 shadow-solid-2 focus:border-primary focus:outline-none dark:border-strokedark dark:bg-black dark:shadow-none dark:focus:border-primary"
                      required
                    />
                    <button
                      type="submit"
                      aria-label="Boshlash tugmasi"
                      className="flex rounded-full bg-black px-7.5 py-2.5 text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark dark:hover:bg-blackho"
                      disabled={loading}
                    >
                      {loading ? "Yuborilmoqda..." : "Yuborish"}
                    </button>
                  </div>
                </form>
                {message && <p className="mt-3 text-black dark:text-white">{message}</p>}
              </div>
            </div>

            <div className="animate_right hidden md:w-1/2 lg:block">
              <div className="relative 2xl:-mr-7.5">
                <Image
                  src="/images/shape/shape-01.png"
                  alt="shape"
                  width={46}
                  height={246}
                  className="absolute -left-11.5 top-0"
                />
                <Image
                  src="/images/shape/shape-02.svg"
                  alt="shape"
                  width={36.9}
                  height={36.7}
                  className="absolute bottom-0 right-0 z-10"
                />
                <Image
                  src="/images/shape/shape-03.svg"
                  alt="shape"
                  width={21.64}
                  height={21.66}
                  className="absolute -right-6.5 bottom-0 z-1"
                />
                <div className="relative aspect-[700/444] w-full">
                  <Image
                    className="shadow-solid-l dark:hidden"
                    src="/images/hero/hero-light.svg"
                    alt="FLOOD Solutions"
                    fill
                  />
                  <Image
                    className="hidden shadow-solid-l dark:block"
                    src="/images/hero/hero-dark.svg"
                    alt="FLOOD Solutions"
                    fill
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
