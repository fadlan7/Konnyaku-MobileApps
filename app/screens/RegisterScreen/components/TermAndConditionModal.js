import React, { useMemo } from 'react';
import { StyleSheet, View, Text, Button, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { useTheme } from '../../../context/ThemeContext';
import CustomButton from '../../../shared/components/CustomButton';

export const TermAndConditionModal = ({ isVisible, onClose, onAccept }) => {
    const { theme } = useTheme();

    const styles = useMemo(
        () =>
            StyleSheet.create({
                container: {
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                modalContent: {
                    backgroundColor: 'white',
                    padding: 20,
                    borderRadius: 10,
                },
                modalText: {
                    fontSize: 18,
                    marginBottom: 10,
                    fontFamily: 'poppins-bold',
                },
                customBtn: {
                    marginTop: 10,
                    backgroundColor: theme.colors.primary,
                    padding: 10,
                    borderRadius: 10,
                    alignItems: 'center',
                    marginBottom: 50,
                },
                tncContent: {
                    fontSize: 14,
                    marginBottom: 10,
                    fontFamily: 'poppins-regular',
                },
                tncTitle: {
                    fontSize: 16,
                    marginBottom: 5,
                    fontFamily: 'poppins-semibold',
                },
                unorderedList: {
                    marginLeft: 20,
                    marginBottom: 10,
                    fontFamily: 'poppins-regular',
                },
            }),
        []
    );

    return (
        <Modal
            isVisible={isVisible}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            onBackdropPress={onClose}
        >
            <View style={styles.container}>
                <ScrollView style={styles.modalContent}>
                    <Text style={styles.modalText}>Term & Condition</Text>
                    <Text>Welcome to Konnyaku !</Text>
                    <Text style={styles.tncContent}>
                        These terms and conditions outline the rules and
                        regulations for the use of Konnyaku 's App.
                    </Text>
                    <Text style={styles.tncContent}>
                        By accessing this app we assume you accept these terms
                        and conditions. Do not continue to use Konnyaku if you
                        do not agree to take all of the terms and conditions
                        stated on this page.
                    </Text>
                    <Text style={styles.tncContent}>
                        The following terminology applies to these Terms and
                        Conditions, Privacy Statement and Disclaimer Notice and
                        all Agreements: "Client", "You" and "Your" refers to
                        you, the person log on this app and compliant to the
                        Company’s terms and conditions. "The Company",
                        "Ourselves", "We", "Our" and "Us", refers to our
                        Company. "Party", "Parties", or "Us", refers to both the
                        Client and ourselves. All terms refer to the offer,
                        acceptance and consideration of payment necessary to
                        undertake the process of our assistance to the Client in
                        the most appropriate manner for the express purpose of
                        meeting the Client’s needs in respect of provision of
                        the Company’s stated services, in accordance with and
                        subject to, prevailing Indonesia Law. Any use of the
                        above terminology or other words in the singular,
                        plural, capitalization and/or he/she or they, are taken
                        as interchangeable and therefore as referring to the
                        same. Our Terms and Conditions were created with the
                        help of the Terms & Conditions Generator.
                    </Text>
                    <Text style={styles.tncTitle}>Cookies</Text>
                    <Text style={styles.tncContent}>
                        We employ the use of cookies. By accessing Konnyaku ,
                        you agreed to use cookies in agreement with the Konnyaku
                        's Privacy Policy.
                    </Text>
                    <Text style={styles.tncContent}>
                        Most interactive apps use cookies to let us retrieve the
                        user's details for each visit. Cookies are used by our
                        app to enable the functionality of certain areas to make
                        it easier for people visiting our app. Some of our
                        affiliate/advertising partners may also use cookies.
                    </Text>
                    <Text style={styles.tncContent}>
                        We will ensure your credential and privacy and the usage
                        of your data will be fully responsible.
                    </Text>
                    <Text style={styles.tncTitle}>License</Text>
                    <Text style={styles.tncContent}>
                        Unless otherwise stated, Konnyaku and/or its licensors
                        own the intellectual property rights for all material on
                        Konnyaku . All intellectual property rights are
                        reserved. You may access this from Konnyaku for your own
                        personal use subjected to restrictions set in these
                        terms and conditions.
                    </Text>
                    <Text style={styles.tncContent}>
                        You must not: Republish material from Konnyaku Sell,
                        rent or sub-license material from Konnyaku Reproduce,
                        duplicate or copy material from Konnyaku, Redistribute
                        content from Konnyaku
                    </Text>
                    <Text style={styles.tncContent}>
                        This Agreement shall begin on the date hereof.
                    </Text>
                    <Text style={styles.tncContent}>
                        Parts of this app offer an opportunity for users to post
                        and exchange opinions and information in certain areas
                        of the app. Konnyaku does not filter, edit, publish or
                        review Comments prior to their presence on the app.
                        Comments do not reflect the views and opinions of
                        Konnyaku ,its agents and/or affiliates. Comments reflect
                        the views and opinions of the person who posts their
                        views and opinions. To the extent permitted by
                        applicable laws, Konnyaku shall not be liable for the
                        Comments or for any liability, damages or expenses
                        caused and/or suffered as a result of any use of and/or
                        posting of and/or appearance of the Comments on this
                        app.
                    </Text>
                    <Text style={styles.tncContent}>
                        Konnyaku reserves the right to monitor all Comments and
                        to remove any Comments which can be considered
                        inappropriate, offensive or causes breach of these Terms
                        and Conditions.
                    </Text>
                    <Text style={styles.tncContent}>
                        You warrant and represent that:
                    </Text>
                    <Text style={styles.unorderedList}>
                        - You are entitled to post the Comments on our app and
                        have all necessary licenses and consents to do so;
                    </Text>
                    <Text style={styles.unorderedList}>
                        - The Comments do not invade any intellectual property
                        right, including without limitation copyright, patent or
                        trademark of any third party;
                    </Text>
                    <Text style={styles.unorderedList}>
                        - The Comments do not contain any defamatory, libelous,
                        offensive, indecent or otherwise unlawful material which
                        is an invasion of privacy
                    </Text>
                    <Text style={styles.unorderedList}>
                        - The Comments will not be used to solicit or promote
                        business or custom or present commercial activities or
                        unlawful activity.
                    </Text>
                    <Text style={styles.tncContent}>
                        You hereby grant Konnyaku a non-exclusive license to
                        use, reproduce, edit and authorize others to use,
                        reproduce and edit any of your Comments in any and all
                        forms, formats or media.
                    </Text>
                    <Text style={styles.tncTitle}>
                        Hyperlinking to our Content
                    </Text>
                    <Text style={styles.tncContent}>
                        The following organizations may link to our App without
                        prior written approval:
                    </Text>
                    <Text style={styles.unorderedList}>
                        - Government agencies;
                    </Text>
                    <Text style={styles.unorderedList}>- Search engines;</Text>
                    <Text style={styles.unorderedList}>
                        - News organizations;
                    </Text>
                    <Text style={styles.unorderedList}>
                        - Online directory distributors may link to our App in
                        the same manner as they hyperlink to the Apps of other
                        listed businesses; and
                    </Text>
                    <Text style={styles.unorderedList}>
                        - These organizations may link to our home page, to
                        publications or to other App information so long as the
                        link: (a) is not in any way deceptive; (b) does not
                        falsely imply sponsorship, endorsement or approval of
                        the linking party and its products and/or services; and
                        (c) fits within the context of the linking party's site.
                    </Text>
                    <Text style={styles.tncTitle}>iFrames</Text>
                    <Text style={styles.tncContent}>
                        Without prior approval and written permission, you may
                        not create frames around our pages that alter in any way
                        the visual presentation or appearance of our App.
                    </Text>
                    <Text style={styles.tncTitle}>Content Liability</Text>
                    <Text style={styles.tncContent}>
                        We shall not be held responsible for any content that
                        appears on your App. You agree to protect and defend us
                        against all claims that are rising on your App. No
                        link(s) should appear on any App that may be interpreted
                        as libelous, obscene or criminal, or which infringes,
                        otherwise violates, or advocates the infringement or
                        other violation of, any third party rights.
                    </Text>
                    <Text style={styles.tncTitle}>Reservation of Rights</Text>
                    <Text style={styles.tncContent}>
                        We reserve the right to request that you remove all
                        links or any particular link to our App. You approve to
                        immediately remove all links to our App upon request. We
                        also reserve the right to amend these terms and
                        conditions and its linking policy at any time. By
                        continuously linking to our App, you agree to be bound
                        to and follow these linking terms and conditions.
                    </Text>
                    <Text style={styles.tncTitle}>
                        Removal of links from our App
                    </Text>
                    <Text style={styles.tncContent}>
                        If you find any link on our App that is offensive for
                        any reason, you are free to contact and inform us any
                        moment. We will consider requests to remove links but we
                        are not obligated to or so or to respond to you
                        directly. We do not ensure that the information on this
                        app is correct, we do not warrant its completeness or
                        accuracy; nor do we promise to ensure that the app
                        remains available or that the material on the app is
                        kept up to date.
                    </Text>
                    <Text style={styles.tncTitle}>Disclaimer</Text>
                    <Text style={styles.tncContent}>
                        To the maximum extent permitted by applicable law, we
                        exclude all representations, warranties and conditions
                        relating to our app and the use of this app. Nothing in
                        this disclaimer will:
                    </Text>
                    <Text style={styles.unorderedList}>
                        limit or exclude our or your liability for death or
                        personal injury;
                    </Text>
                    <Text style={styles.unorderedList}>
                        limit or exclude our or your liability for fraud or
                        fraudulent misrepresentation;
                    </Text>
                    <Text style={styles.unorderedList}>
                        limit any of our or your liabilities in any way that is
                        not permitted under applicable law; or
                    </Text>
                    <Text style={styles.unorderedList}>
                        exclude any of our or your liabilities that may not be
                        excluded under applicable law.
                    </Text>
                    <Text style={styles.tncContent}>
                        The limitations and prohibitions of liability set in
                        this Section and elsewhere in this disclaimer: (a) are
                        subject to the preceding paragraph; and (b) govern all
                        liabilities arising under the disclaimer, including
                        liabilities arising in contract, in tort and for breach
                        of statutory duty.
                    </Text>
                    <Text style={styles.tncContent}>
                        As long as the app and the information and services on
                        the app are provided free of charge, we will not be
                        liable for any loss or damage of any nature.
                    </Text>
                    <Text style={styles.tncTitle}>User Account</Text>
                    <Text style={styles.tncContent}>
                        We have full authority to ban your account if we find
                        any illegal activities that refer to your account that
                        break our terms and conditions.
                    </Text>
                    <Text style={styles.tncTitle}>Contacts</Text>
                    <Text style={styles.tncContent}>
                        If you have any question due to our terms and conditions
                        or you find any illegal activities, please contact us on
                        support@konnyaku.com
                    </Text>

                    <CustomButton
                        title="Agree"
                        color="#fff"
                        fontFamily="poppins-semibold"
                        fontSize={18}
                        style={styles.customBtn}
                        onPress={onAccept}
                    />
                </ScrollView>
            </View>
        </Modal>
    );
};
