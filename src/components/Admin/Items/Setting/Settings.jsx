import { FaEnvelope } from "react-icons/fa6";
import Input from "../../../Ui/FormInput/Input";
import PageHeader from "../../../Ui/Header/PageHeader";
import { Tab, Tabs } from "../../../Ui/Tab/Tab";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Settings() {
  const breadcrumbs = [
    { label: "Dashboard", link: "/admin/dashboardManagment" },
    { label: "Settings", link: "/admin/settings" },
  ];

  const [siteName, setSiteName] = useState("");
  const [siteEmail, setSiteEmail] = useState("");
  const [mailMailer, setMailMailer] = useState("");
  const [mailHost, setMailHost] = useState("");
  const [mailUsername, setMailUsername] = useState("");
  const [mailPassword, setMailPassword] = useState("");
  const [mailPort, setMailPort] = useState("");
  const [error, setError] = useState(null);

  //Get settings
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}api/site/settings`)
      .then((res) => {
        if (res.data.status === true) {
          setSiteName(res.data.data.site_name);
          setSiteEmail(res.data.data.site_email);
          setMailMailer(res.data.data.mail_mailer);
          setMailHost(res.data.data.mail_host);
          setMailUsername(res.data.data.mail_username);
          setMailPassword(res.data.data.mail_password);
          setMailPort(res.data.data.mail_port);
        }
      });
  }, []);

  //Handle/ Update Email Submit
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("mail_mailer", mailMailer || "");
    formData.append("mail_host", mailHost || "");
    formData.append("mail_username", mailUsername || "");
    formData.append("mail_password", mailPassword || "");
    formData.append("mail_port", mailPort || "");

    axios
      .post(
        `${import.meta.env.VITE_API_URL}api/update/site/email/settings`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message);
        }
      })
      .catch((err) => {
        setError(err.response?.data?.errors || { message: err.message });
      });
  };
  return (
    <div>
      <PageHeader title="Settings" breadcrumbItems={breadcrumbs} />
      <div className="bg-white flex flex-col gap-4 p-8 h-screen shadow-2xl mt-4">
        <div className="flex flex-col gap-4">
          <Tabs>
            {/* General Settings */}
            <Tab label="General">
              <div className="flex gap-4">
                <div className="w-6/12">
                  <Input
                    required={true}
                    name="site_name"
                    id="site_name"
                    type="text"
                    label="Site Name"
                    placeholder="Site Name"
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                  />
                  {error && <p className="text-red-500">{error.site_name}</p>}
                </div>
                <div className="w-6/12">
                  <Input
                    required={true}
                    name="site_email"
                    id="site_email"
                    type="email"
                    label="Site Email"
                    placeholder="Site Email"
                    value={siteEmail}
                    onChange={(e) => setSiteEmail(e.target.value)}
                  />
                  {error && <p className="text-red-500">{error.site_email}</p>}
                </div>
              </div>
            </Tab>

            {/* Email Settings */}
            <Tab label="Email Settings" icon={<FaEnvelope />}>
              <form onSubmit={handleEmailSubmit}>
                <div className="flex gap-4">
                  <div className="w-6/12">
                    <Input
                      required={true}
                      name="mail_mailer"
                      id="mail_mailer"
                      type="text"
                      label="Mail Mailer"
                      placeholder="Mail Mailer"
                      value={mailMailer}
                      onChange={(e) => setMailMailer(e.target.value)}
                    />
                    {error && (
                      <p className="text-red-500">{error.mail_mailer}</p>
                    )}
                  </div>
                  <div className="w-6/12">
                    <Input
                      required={true}
                      name="mail_host"
                      id="mail_host"
                      type="text"
                      label="MAIL HOST"
                      placeholder="MAIL HOST"
                      value={mailHost}
                      onChange={(e) => setMailHost(e.target.value)}
                    />
                    {error && <p className="text-red-500">{error.mail_host}</p>}
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-6/12">
                    <Input
                      required={true}
                      name="mail_username"
                      id="mail_username"
                      type="text"
                      label="MAIL USERNAME"
                      placeholder="MAIL USERNAME"
                      value={mailUsername}
                      onChange={(e) => setMailUsername(e.target.value)}
                    />
                    {error && (
                      <p className="text-red-500">{error.mail_username}</p>
                    )}
                  </div>
                  <div className="w-6/12">
                    <Input
                      required={true}
                      name="mail_password"
                      id="mail_password"
                      type="text"
                      label="MAIL PASSWORD"
                      placeholder="MAIL PASSWORD"
                      value={mailPassword}
                      onChange={(e) => setMailPassword(e.target.value)}
                    />
                    {error && (
                      <p className="text-red-500">{error.mail_password}</p>
                    )}
                  </div>
                </div>
                <div className="w-6/12">
                  <Input
                    required={true}
                    name="mail_port"
                    id="mail_port"
                    type="text"
                    label="MAIL PORT"
                    placeholder="MAIL PORT"
                    value={mailPort}
                    onChange={(e) => setMailPort(e.target.value)}
                  />
                  {error && <p className="text-red-500">{error.mail_port}</p>}
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 flex self-end text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto mt-4 px-8 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </button>
              </form>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
