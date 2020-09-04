import React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import AuthMetaLinks from "./AuthMetaLinks";
import { MwContainer } from "./styledComponents"
// Type whatever you expect in 'this.props.match.params.*'
type PathParamsType = {
  page: string,
}

// Your component own properties
type PropsType = RouteComponentProps<PathParamsType> & {
  someString: string,
}
export default withRouter((props: PropsType) => {
  const data = {
    about: {
      body: <>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </>,
      title: `About us`,
    },
    legal: {
      body: `Company Name operates the Website Name website, which provides the SERVICE.
    This page is used to inform website visitors regarding our policies with the collection, use, and disclosure of Personal Information if anyone decided to use our Service, the Website Name website.

    If you choose to use our Service, then you agree to the collection and use of information in relation with this policy. The Personal Information that we collect are used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy.

    The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is accessible at Website URL, unless otherwise defined in this Privacy Policy.

    Information Collection and Use
    For a better experience while using our Service, we may require you to provide us with certain personally identifiable information, including but not limited to your name, phone number, and postal address. The information that we collect will be used to contact or identify you.

    Log Data
    We want to inform you that whenever you visit our Service, we collect information that your browser sends to us that is called Log Data. This Log Data may include information such as your computer's Internet Protocol (“IP”) address, browser version, pages of our Service that you visit, the time and date of your visit, the time spent on those pages, and other statistics.

    Cookies
    Cookies are files with small amount of data that is commonly used an anonymous unique identifier. These are sent to your browser from the website that you visit and are stored on your computer's hard drive.

    Our website uses these “cookies” to collection information and to improve our Service. You have the option to either accept or refuse these cookies, and know when a cookie is being sent to your computer. If you choose to refuse our cookies, you may not be able to use some portions of our Service.

    `,
      title: `Privacy Policy of Company Name`,

    },

    licences: {
      body: <a href="https://fontawesome.com/license">Font Awesome</a>,
      title: `Licences`,
    },
    privacy: {
      body: `Privacy Notice
    This privacy notice discloses the privacy practices for (website address). This privacy notice applies solely to information collected by this website. It will notify you of the following:

    What personally identifiable information is collected from you through the website, how it is used and with whom it may be shared.
    What choices are available to you regarding the use of your data.
    The security procedures in place to protect the misuse of your information.
    How you can correct any inaccuracies in the information.
    Information Collection, Use, and Sharing
    We are the sole owners of the information collected on this site. We only have access to/collect information that you voluntarily give us via email or other direct contact from you. We will not sell or rent this information to anyone.

    We will use your information to respond to you, regarding the reason you contacted us. We will not share your information with any third party outside of our organization, other than as necessary to fulfill your request, e.g. to ship an order.

    Unless you ask us not to, we may contact you via email in the future to tell you about specials, new products or services, or changes to this privacy policy.

    Your Access to and Control Over Information
    You may opt out of any future contacts from us at any time. You can do the following at any time by contacting us via the email address or phone number given on our website:

    See what data we have about you, if any.
    Change/correct any data we have about you.
    Have us delete any data we have about you.
    Express any concern you have about our use of your data.
    Security
    We take precautions to protect your information. When you submit sensitive information via the website, your information is protected both online and offline.

    Wherever we collect sensitive information (such as credit card data), that information is encrypted and transmitted to us in a secure way. You can verify this by looking for a lock icon in the address bar and looking for "https" at the beginning of the address of the Web page.

    While we use encryption to protect sensitive information transmitted online, we also protect your information offline. Only employees who need the information to perform a specific job (for example, billing or customer service) are granted access to personally identifiable information. The computers/servers in which we store personally identifiable information are kept in a secure environment.

    If you feel that we are not abiding by this privacy policy, you should contact us immediately via telephone at XXX YYY-ZZZZ or via email.`,
      title: `Licences`,
    },
  };
  // useEffect(() => {
  // }, []);
  return (
    <MwContainer
      style={{ margin: `1em auto` }}
    >
      {props.match.params.page && data[props.match.params.page] ? (
        <>
          <h1>{data[props.match.params.page].title}</h1>
          {data[props.match.params.page].body}
        </>
      ) : (
          <h3>Page not found</h3>
        )}
      <AuthMetaLinks location={props.location} />
    </MwContainer>
  );
});