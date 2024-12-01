import { FaEnvelope } from "react-icons/fa6";
import Input from "../../../Ui/FormInput/Input";
import PageHeader from "../../../Ui/Header/PageHeader";
import { Tab, Tabs } from "../../../Ui/Tab/Tab";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Settings() {
    const breadcrumbs = [
        { label: 'Dashboard', link: '/admin/dashboardManagment' },
        { label: 'Settings', link: '/admin/settings' },
    ];

    const [siteName, setSiteName] = useState('')
    const [siteEmail, setSiteEmail] = useState('')
    const [mailMailer, setMailMailer] = useState('')
    const [mailHost, setMailHost] = useState('')
    const [mailUsername, setMailUsername] = useState('')
    const [mailPassword, setMailPassword] = useState('')
    const [mailPort, setMailPort] = useState('')

    //Get settings
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}api/site/settings`).then((res) => {
            console.log(res)
            if (res.data.status === true) {
                setSiteName(res.data.site_name)
                setSiteEmail(res.data.site_email)
                setMailMailer(res.data.mail_mailer)
                setMailHost(res.data.mail_host)
                setMailUsername(res.data.mail_username)
                setMailPassword(res.data.mail_password)
                setMailPort(res.data.mail_port)
            }
        })
    }, [])
    const handleEmailSubmit = (e) => {
        console.log(mailMailer, mailHost, mailUsername, mailPassword, mailPort)
        e.preventDefault()
        axios.post(`${import.meta.env.VITE_API_URL}api/update/site/email/settings`, {
            mail_mailer: mailMailer,
            mail_host: mailHost,
            mail_username: mailUsername,
            mail_password: mailPassword,
            mail_port: mailPort,
        },
            {
                headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            }
        }).then((res) => {
            console.log(res)
            console.log('submitted')
            if (res.data.status === true) {
                toast.success(res.data.message)
            } else {
                toast.error(res.data.message)
            }
        })
    }
    return (
        <div>
            <PageHeader
                title="Settings"
                breadcrumbItems={breadcrumbs}
            />
            <div className="bg-white flex flex-col gap-4 p-8 shadow-2xl mt-4">
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
                                </div>
                                <button type="submit" className="bg-blue-600 flex self-end text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto mt-4 px-8 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Submit
                                </button>
                            </form>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}