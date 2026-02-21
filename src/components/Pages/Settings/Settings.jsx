import React, { useEffect, useState } from "react";
import {
    Globe,
    Layout,
    Mail,
    Image,
    Search,
    Palette,
    CreditCard,
    Settings as SettingsIcon,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHeaderConfig } from "../../Services/ConfigThunk";

const Input = ({ label, placeholder, value, onChange }) => (
    <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-600">{label}</label>
        <input
            type="text"
            placeholder={placeholder}
            value={value || ""}
            onChange={onChange}
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        />
    </div>
);

const TextArea = ({ label }) => (
    <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-600">{label}</label>
        <textarea
            rows={3}
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        />
    </div>
);

const Toggle = ({ label }) => (
    <div className="flex items-center justify-between border rounded-lg px-4 py-3">
        <span className="text-gray-700 text-sm">{label}</span>
        <input type="checkbox" className="w-5 h-5 accent-black" />
    </div>
);

const FileUpload = ({ label }) => (
    <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-600">{label}</label>
        <input type="file" className="border rounded-lg px-4 py-2" />
    </div>
);

const Settings = () => {
    const [activeTab, setActiveTab] = useState("general");

    const tabs = [
        { id: "general", label: "General", icon: Globe },
        { id: "header", label: "Header", icon: Layout },
        { id: "footer", label: "Footer", icon: Mail },
        { id: "homepage", label: "Homepage", icon: Image },
        { id: "seo", label: "SEO", icon: Search },
        { id: "theme", label: "Theme", icon: Palette },
        { id: "payments", label: "Payments", icon: CreditCard },
        { id: "advanced", label: "Advanced", icon: SettingsIcon },
    ];

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchHeaderConfig());
    }, [dispatch]);

    const { headerConfigData } = useSelector((state) => state.headerConfig);
    console.log(headerConfigData);

    return (
        <div className="p-6">
            {/* Tabs */}
            <div className="flex flex-wrap gap-3 border-b pb-4 mb-6">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition ${activeTab === tab.id
                                ? "bg-orange-600 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                        >
                            <Icon size={16} />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            <div className="space-y-6">
                {/* GENERAL */}
                {activeTab === "general" && (
                    <>
                        <h2 className="text-xl font-semibold">General Settings</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <Input label="Website Title" placeholder="Zestora" />
                            <Input label="Admin Email" placeholder="admin@zestora.com" />
                        </div>
                        <TextArea label="Website Description" />
                    </>
                )}

                {/* HEADER */}
                {activeTab === "header" && (
                    <>
                        <h2 className="text-xl font-semibold">Header Configuration</h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            <Input label="Site Name" placeholder="Zestora" value={headerConfigData?.branding?.siteName} />
                            <FileUpload label="Upload Logo" />
                        </div>

                        <h3 className="font-semibold mt-6">Navigation Links</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <Input label="Home Label" placeholder="Home" />
                            <Input label="Home Path" placeholder="/home" />
                            <Input label="About Label" placeholder="About" />
                            <Input label="About Path" placeholder="/about" />
                        </div>

                        <h3 className="font-semibold mt-6">Header Features</h3>
                        <Toggle label="Show Search Bar" />
                        <Toggle label="Show Wishlist Icon" />
                        <Toggle label="Show Compare Icon" />
                    </>
                )}

                {/* FOOTER */}
                {activeTab === "footer" && (
                    <>
                        <h2 className="text-xl font-semibold">Footer Configuration</h2>
                        <TextArea label="Footer Description" />

                        <h3 className="font-semibold mt-6">Social Links</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <Input label="Facebook URL" placeholder="https://facebook.com" />
                            <Input label="Instagram URL" placeholder="https://instagram.com" />
                            <Input label="Twitter URL" placeholder="https://twitter.com" />
                        </div>

                        <h3 className="font-semibold mt-6">Contact Information</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <Input label="Address" placeholder="Chandigarh, India" />
                            <Input label="Phone" placeholder="+91 9876543210" />
                            <Input label="Email" placeholder="support@zestora.com" />
                        </div>

                        <h3 className="font-semibold mt-6">Newsletter Section</h3>
                        <Input label="Newsletter Title" placeholder="Stay Updated" />
                        <TextArea label="Newsletter Description" />
                        <Input label="Button Text" placeholder="Subscribe" />
                    </>
                )}

                {/* HOMEPAGE */}
                {activeTab === "homepage" && (
                    <>
                        <h2 className="text-xl font-semibold">Homepage Sections</h2>

                        <h3 className="font-semibold mt-4">Hero Section</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <Input label="Hero Button Text" placeholder="Explore Now" />
                            <Input label="Hero Button Link" placeholder="/menu" />
                        </div>

                        <h3 className="font-semibold mt-6">Floating Advertisement</h3>
                        <Toggle label="Show Floating Ad" />
                        <Input label="Ad Title" placeholder="🔥 Special Offer" />
                        <TextArea label="Ad Description" />

                        <h3 className="font-semibold mt-6">Trending Deals</h3>
                        <Input label="Deal Title" placeholder="Weekend Combo" />
                        <TextArea label="Deal Description" />

                        <h3 className="font-semibold mt-6">AI Suggestions</h3>
                        <Input label="AI Section Title" placeholder="AI Recommended For You" />
                        <TextArea label="AI Description" />
                    </>
                )}

                {/* SEO */}
                {activeTab === "seo" && (
                    <>
                        <h2 className="text-xl font-semibold">SEO Settings</h2>
                        <Input label="Meta Title" placeholder="Best Online Food Ordering" />
                        <TextArea label="Meta Description" />
                        <Input label="Keywords" placeholder="food, pizza, burgers" />
                    </>
                )}

                {/* THEME */}
                {activeTab === "theme" && (
                    <>
                        <h2 className="text-xl font-semibold">Theme Settings</h2>
                        <Input label="Primary Color" placeholder="#000000" />
                        <Input label="Secondary Color" placeholder="#ff4d4d" />
                        <Toggle label="Enable Dark Mode" />
                    </>
                )}

                {/* PAYMENTS */}
                {activeTab === "payments" && (
                    <>
                        <h2 className="text-xl font-semibold">Payment Settings</h2>
                        <Toggle label="Enable Razorpay" />
                        <Toggle label="Enable Stripe" />
                        <Toggle label="Enable Cash on Delivery" />
                    </>
                )}

                {/* ADVANCED */}
                {activeTab === "advanced" && (
                    <>
                        <h2 className="text-xl font-semibold">Advanced Settings</h2>
                        <Toggle label="Maintenance Mode" />
                        <Toggle label="Enable Debug Mode" />
                        <TextArea label="Custom Scripts (Header)" />
                    </>
                )}
            </div>
        </div>
    );
};

export default Settings;
