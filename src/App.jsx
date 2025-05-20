import React, { useState } from "react";

const App = () => {
    // States
    const [activeTab, setActiveTab] = useState("home");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // ✅ FEHLT vorher!

    // Mock data for courses
    const freeChallenge = {
        title: "Kostenlose 5-Tage-Challenge",
        description:
            "Starte deine persönliche Challenge mit täglichen Aufgaben und Gewohnheiten, die dich produktiver machen.",
        benefits: [
            "Tägliche Lektionen & Übungen",
            "Hilfreiche Ressourcen zum ADHS-Management",
            "Motivation durch kleine Erfolge"
        ]
    };

    const premiumChallenge = {
        title: "30-Tage Premium-Challenge",
        price: "20€",
        description:
            "Eine intensivere Reise in dein Selbstmanagement mit strukturierten Inhalten, Tagebuchfunktion und Support.",
        features: [
            "Exklusive Tagesübungen",
            "Persönliches Tagebuch zur Reflexion",
            "Zugriff auf Expertenvideos",
            "Community-Unterstützung"
        ],
        testimonials: [
            {
                name: "Anna M.",
                text: "Diese Challenge hat mir wirklich geholfen, mich besser zu organisieren."
            },
            {
                name: "Lars K.",
                text: "Endlich ein strukturiertes Programm, das Spaß macht und effektiv ist."
            }
        ]
    };

    const faqs = [
        {
            question: "Was ist ADHS?",
            answer:
                "ADHS steht für Aufmerksamkeitsdefizit-Hyperaktivitäts-Störung. Es ist eine neurologische Entwicklungsstörung, die sich auf Aufmerksamkeit, Impulskontrolle und Aktivität auswirkt."
        },
        {
            question: "Wie kann ich mich motivieren, wenn ich ADHS habe?",
            answer:
                "Es gibt mehrere Techniken wie Pomodoro, Belohnungssysteme oder strukturierte Routinen, die helfen können."
        },
        {
            question: "Ist die Challenge auch für Erwachsene geeignet?",
            answer:
                "Ja! Die Inhalte sind für alle Altersgruppen konzipiert und anpassbar."
        }
    ];

    // Handlers
    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password)
            return alert("Bitte gib E-Mail und Passwort ein.");
        try {
            const response = await fetch("/.netlify/functions/login", {
                method: "POST",
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (data.success) {
                setIsLoggedIn(true);
                setActiveTab("home");
            } else {
                alert("Login fehlgeschlagen. Bitte überprüfe deine Daten.");
            }
        } catch (error) {
            alert("Ein Fehler ist aufgetreten. Versuche es später erneut.");
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!email || !password || !firstName)
            return alert("Bitte fülle alle Pflichtfelder aus.");
        try {
            const response = await fetch("/.netlify/functions/register", {
                method: "POST",
                body: JSON.stringify({ email, password, firstName })
            });
            const data = await response.json();
            if (data.success) {
                setIsLoggedIn(true);
                setActiveTab("home");
                alert("Erfolgreich registriert! Deine Checkliste wird per E-Mail gesendet.");
                await fetch("/.netlify/functions/send-checklist", {
                    method: "POST",
                    body: JSON.stringify({ email })
                });
            } else {
                alert("Registrierung fehlgeschlagen.");
            }
        } catch (error) {
            alert("Ein Fehler ist aufgetreten. Versuche es später erneut.");
        }
    };

    const handleCheckout = async () => {
        try {
            const response = await fetch("/.netlify/functions/create-checkout", {
                method: "POST"
            });
            const data = await response.json();
            window.location.href = data.url;
        } catch (error) {
            alert("Beim Kauf ist ein Fehler aufgetreten.");
        }
    };

    return (
        <div className="bg-white text-gray-800 font-sans">
            {/* TESTBOTSCHAFT – damit du weißt, dass React funktioniert */}
            <div style={{ padding: '1rem', backgroundColor: '#f0f0f0' }}>
                <h1 style={{ color: 'blue' }}>React läuft!</h1>
                <p>Wenn du diese Nachricht siehst, ist React richtig gerendert.</p>
            </div>

            {/* Header */}
            <header className="sticky top-0 z-50 bg-white shadow-md">
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-blue-600">ADHS Lernchallenge</h1>
                    <nav className="hidden md:flex space-x-6">
                        {["home", "courses", "faq", "contact"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`capitalize hover:text-blue-600 transition-colors ${activeTab === tab ? "text-blue-600 font-semibold" : ""
                                    }`}
                            >
                                {tab === "home"
                                    ? "Startseite"
                                    : tab === "courses"
                                        ? "Kurse"
                                        : tab === "faq"
                                            ? "FAQ"
                                            : "Kontakt"}
                            </button>
                        ))}
                        {!isLoggedIn ? (
                            <button
                                onClick={() => setActiveTab("login")}
                                className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                            >
                                Login
                            </button>
                        ) : (
                            <button
                                onClick={() => setActiveTab("profile")}
                                className="flex items-center space-x-1 text-blue-600 hover:underline"
                            >
                                <span>Profil</span>
                            </button>
                        )}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-blue-600"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-menu"
                        >
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white shadow-lg">
                        <nav className="flex flex-col p-4 space-y-3">
                            {["home", "courses", "faq", "contact"].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => {
                                        setActiveTab(tab);
                                        setIsMenuOpen(false);
                                    }}
                                    className={`capitalize py-2 hover:text-blue-600 transition-colors ${activeTab === tab ? "text-blue-600 font-medium" : ""
                                        }`}
                                >
                                    {tab === "home"
                                        ? "Startseite"
                                        : tab === "courses"
                                            ? "Kurse"
                                            : tab === "faq"
                                                ? "FAQ"
                                                : "Kontakt"}
                                </button>
                            ))}
                            {!isLoggedIn ? (
                                <button
                                    onClick={() => {
                                        setActiveTab("login");
                                        setIsMenuOpen(false);
                                    }}
                                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                                >
                                    Login
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        setActiveTab("profile");
                                        setIsMenuOpen(false);
                                    }}
                                    className="flex items-center space-x-1 text-blue-600 hover:underline"
                                >
                                    <span>Profil</span>
                                </button>
                            )}
                        </nav>
                    </div>
                )}
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                {activeTab === "home" && (
                    <section className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                            Starte deine{" "}
                            <span className="text-blue-600">ADHS-Lern-Challenge</span>
                        </h2>
                        <p className="text-lg text-gray-700 mb-6">
                            Eine praktische, strukturierte Methode, um deine Konzentration zu
                            verbessern – Tag für Tag.
                        </p>
                        <button
                            onClick={() => setActiveTab("register")}
                            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg transform hover:scale-105"
                        >
                            Melde dich jetzt an & starte deine 5-Tage-Challenge
                        </button>
                    </section>
                )}

                {activeTab === "courses" && (
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                        {/* Free Challenge */}
                        <div className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-xl font-bold mb-2">
                                {freeChallenge.title}
                            </h3>
                            <p className="mb-4 text-gray-700">
                                {freeChallenge.description}
                            </p>
                            <ul className="space-y-2 mb-6">
                                {freeChallenge.benefits.map((benefit, idx) => (
                                    <li key={idx} className="flex items-start">
                                        <svg
                                            className="w-5 h-5 text-green-500 mr-2 mt-0.5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M5 13l4 4L19 7"
                                            ></path>
                                        </svg>
                                        <span>{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                            <button
                                onClick={() => setActiveTab("register")}
                                className="w-full py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                            >
                                Registrieren & starten
                            </button>
                        </div>

                        {/* Premium Challenge */}
                        <div className="border border-gray-200 rounded-lg p-6 shadow-md relative">
                            <div className="absolute top-2 right-4 flex items-center text-yellow-600">
                                <svg
                                    className="w-5 h-5 mr-1"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
                                </svg>
                                <span className="font-semibold">Premium</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2">
                                {premiumChallenge.title}
                            </h3>
                            <p className="mb-4 text-gray-700">
                                {premiumChallenge.description}
                            </p>
                            <div className="mb-4">
                                <span className="text-2xl font-bold text-blue-600">
                                    {premiumChallenge.price}
                                </span>
                                <span className="text-sm text-gray-500 ml-1">einmalig</span>
                            </div>
                            <ul className="space-y-2 mb-6">
                                {premiumChallenge.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start">
                                        <svg
                                            className="w-5 h-5 text-green-500 mr-2 mt-0.5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M5 13l4 4L19 7"
                                            ></path>
                                        </svg>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <button
                                onClick={handleCheckout}
                                className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                            >
                                Jetzt kaufen
                            </button>

                            {/* Testimonials */}
                            <div className="mt-6 pt-4 border-t border-gray-200">
                                <h4 className="font-semibold mb-2">Erfahrungsberichte:</h4>
                                {premiumChallenge.testimonials.map((testimonial, idx) => (
                                    <div key={idx} className="mb-3">
                                        <p className="text-sm italic text-gray-600">
                                            "{testimonial.text}"
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            — {testimonial.name}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {activeTab === "faq" && (
                    <section className="max-w-3xl mx-auto">
                        <h2 className="text-2xl font-bold mb-6">Häufig gestellte Fragen</h2>
                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <div key={index} className="border-b pb-4">
                                    <h3 className="font-semibold text-lg">{faq.question}</h3>
                                    <p className="text-gray-700 mt-2">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8">
                            <h3 className="font-semibold mb-2">Hast du noch eine Frage?</h3>
                            <form onSubmit={() => alert("Vielen Dank für deine Anfrage!")}>
                                <input
                                    type="text"
                                    placeholder="Deine Frage..."
                                    className="w-full px-4 py-2 border rounded mb-2"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                                >
                                    Absenden
                                </button>
                            </form>
                        </div>
                    </section>
                )}

                {activeTab === "contact" && (
                    <section className="max-w-2xl mx-auto">
                        <h2 className="text-2xl font-bold mb-6">Kontakt</h2>
                        <form
                            onSubmit={async (e) => {
                                e.preventDefault();
                                const formData = new FormData(e.target);
                                const data = {
                                    name: formData.get("name"),
                                    email: formData.get("email"),
                                    message: formData.get("message")
                                };

                                const response = await fetch("/.netlify/functions/send-contact", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify(data)
                                });

                                const result = await response.json();

                                if (result.success) {
                                    alert("Vielen Dank für deine Nachricht! Wir melden uns bald bei dir.");
                                    e.target.reset(); // Leere das Formular
                                } else {
                                    alert("Leider ist ein Fehler aufgetreten. Versuche es später erneut.");
                                }
                            }}
                            className="space-y-4"
                        >
                            <div>
                                <label className="block text-sm font-medium mb-1">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="w-full px-4 py-2 border rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">E-Mail</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="w-full px-4 py-2 border rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Nachricht</label>
                                <textarea
                                    name="message"
                                    rows="4"
                                    className="w-full px-4 py-2 border rounded"
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                            >
                                Nachricht senden
                            </button>
                        </form>
                    </section>
                )}

                {activeTab === "login" && (
                    <section className="max-w-md mx-auto mt-10">
                        <h2 className="text-2xl font-bold mb-6">Login</h2>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">E-Mail</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-2 border rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Passwort
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-2 border rounded"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                            >
                                Einloggen
                            </button>
                            <p className="text-center text-sm">
                                Noch kein Account?{" "}
                                <button
                                    onClick={() => setActiveTab("register")}
                                    className="text-blue-600 hover:underline"
                                >
                                    Registriere dich hier
                                </button>
                            </p>
                        </form>
                    </section>
                )}

                {activeTab === "register" && (
                    <section className="max-w-md mx-auto mt-10">
                        <h2 className="text-2xl font-bold mb-6">Registrierung</h2>
                        <form onSubmit={handleRegister} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Vorname *
                                </label>
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="w-full px-4 py-2 border rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    E-Mail *
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-2 border rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Passwort *
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-2 border rounded"
                                    minLength="8"
                                    required
                                />
                            </div>
                            <div className="text-xs text-gray-500">
                                * Pflichtfelder
                            </div>
                            <button
                                type="submit"
                                className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                            >
                                Registrieren
                            </button>
                            <p className="text-center text-sm">
                                Bereits registriert?{" "}
                                <button
                                    onClick={() => setActiveTab("login")}
                                    className="text-blue-600 hover:underline"
                                >
                                    Zum Login
                                </button>
                            </p>
                        </form>
                    </section>
                )}

                {activeTab === "profile" && (
                    <section className="max-w-md mx-auto mt-10">
                        <h2 className="text-2xl font-bold mb-6">Mein Profil</h2>
                        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                            <p className="font-semibold">{firstName || "Benutzer"}</p>
                            <p className="text-sm text-gray-600">{email}</p>
                            <hr className="my-4" />
                            <h3 className="font-semibold">Downloads:</h3>
                            <ul className="list-disc list-inside text-sm mt-2">
                                <li>Kostenlose Checkliste</li>
                            </ul>
                            <h3 className="font-semibold mt-4">Challenges:</h3>
                            <ul className="list-disc list-inside text-sm mt-2">
                                <li>5-Tage-Challenge (gestartet)</li>
                            </ul>
                        </div>
                        <button
                            onClick={() => setIsLoggedIn(false)}
                            className="mt-4 px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"
                        >
                            Abmelden
                        </button>
                    </section>
                )}
            </main>

            {/* Footer */}
            <footer className="bg-gray-100 py-6 mt-12">
                <div className="container mx-auto px-4 text-center text-sm text-gray-600">
                    © 2025 ADHS Lernchallenge | Datenschutz | Impressum
                </div>
            </footer>
        </div>
    );
};

export default App;