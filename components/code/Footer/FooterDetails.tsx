import { Clock, Mail, MapPin, Phone } from "lucide-react";
import React, { FC } from "react";

interface CompanyContact {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

const companyData: CompanyContact[] = [
  {
    title: "Working Hours",
    subtitle: "Mon - Sat: 10:00 AM - 7:00 PM",
    icon: <Clock className="h-6 w-6 " />,
  },
  {
    title: "Email Us",
    subtitle: "taikoxyz@gmail.com",
    icon: <Mail className="h-6 w-6 " />,
  },
  {
    title: "Visit Us",
    subtitle: "Canyon Island MS, USA",
    icon: <MapPin className="h-6 w-6 " />,
  },
  {
    title: "Call Us",
    subtitle: "+234 705 443 9826",
    icon: <Phone className="h-6 w-6 " />,
  },
];
const FooterDetails = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 items-center gap-4 mt-4">
      {companyData.map((data, index) => (
        <FooterContact data={data} key={index} />
      ))}
    </div>
  );
};

interface FooterContactProps {
  data: CompanyContact;
}

const FooterContact: FC<FooterContactProps> = ({ data }) => {
  return (
    <div className=" dark:border-white rounded-md p-1 flex justify-center gap-4 items-center text-black prata-regular dark:text-white hoverEffect bg-slate-200 dark:bg-slate-900">
      <div className="flex">
        <p>{data.icon}</p>
      </div>

      <div>
        <h2>{data.title}</h2>
        <p className="text-slate-500 text-sm">{data.subtitle}</p>
      </div>
    </div>
  );
};

export default FooterDetails;
