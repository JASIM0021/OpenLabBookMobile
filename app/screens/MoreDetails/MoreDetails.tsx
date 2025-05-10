import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Share,
  Linking,
  Alert,
  Platform,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React, { useState } from 'react';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/MaterialIcons';
import GolbalStyle from '../../Style';
import { useTheme } from 'react-native-paper';
import { scale } from 'react-native-size-matters';

const MoreDetails = () => {
  const [isContactUsCollapsed, setContactUsCollapsed] = useState(true);
  const [isShareAppCollapsed, setShareAppCollapsed] = useState(true);
  const [isAboutUsCollapsed, setAboutUsCollapsed] = useState(true);
  const [isTermsCollapsed, setTermsCollapsed] = useState(true);
  const [isPrivacyCollapsed, setPrivacyCollapsed] = useState(true);
  const [isDeveloperCollapsed, setDeveloperCollapsed] = useState(true);

  const toggleContactUs = () => setContactUsCollapsed(!isContactUsCollapsed);
  const toggleShareApp = () => setShareAppCollapsed(!isShareAppCollapsed);
  const toggleAboutUs = () => setAboutUsCollapsed(!isAboutUsCollapsed);
  const toggleTerms = () => setTermsCollapsed(!isTermsCollapsed);
  const togglePrivacy = () => setPrivacyCollapsed(!isPrivacyCollapsed);
  const toggleDeveloper = () => setDeveloperCollapsed(!isDeveloperCollapsed);

  const handleEmail = () => {
    Linking.openURL('mailto:bupsuhealth@gmail.com');
  };

  const handlePhone = () => {
    const phoneNumber = '+91 81161 82108';
    if (Platform.OS === 'android') {
      Linking.openURL(`tel:${phoneNumber}`);
      return;
    }

    if (Platform.OS === 'ios') {
      Linking.openURL(`telprompt:${phoneNumber}`);
      return;
    }
  };

  const shareApp = async () => {
    try {
      const result = await Share.share({
        message:
          'Check out HealthApp - Your one-stop solution for all health services! Download now from: https://play.google.com/store/apps/healthapp',
        title: 'Share HealthApp',
      });
      if (result.action === Share.sharedAction) {
        Alert.alert('Success', 'Thank you for sharing our app!');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while sharing');
    }
  };
  const theme = useTheme();

  return (
    <SafeAreaView style={GolbalStyle.container}>
      <View
        style={[
          GolbalStyle.container,
          {
            backgroundColor: theme.colors.background,
            paddingHorizontal: scale(15),
          },
        ]}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity onPress={toggleContactUs} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Icon name="contact-support" size={24} color="#2196F3" />
              <Text style={styles.title}>Contact Us</Text>
              <Icon
                name={
                  isContactUsCollapsed
                    ? 'keyboard-arrow-down'
                    : 'keyboard-arrow-up'
                }
                size={24}
                color="#666"
              />
            </View>
          </TouchableOpacity>
          <Collapsible collapsed={isContactUsCollapsed}>
            <TouchableOpacity onPress={handleEmail} style={styles.contactItem}>
              <Icon name="email" size={20} color="#2196F3" />
              <Text style={styles.content}>support@healthapp.com</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePhone} style={styles.contactItem}>
              <Icon name="phone" size={20} color="#2196F3" />
              <Text style={styles.content}>+1 (234) 567-890</Text>
            </TouchableOpacity>
          </Collapsible>

          <TouchableOpacity onPress={toggleShareApp} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Icon name="share" size={24} color="#4CAF50" />
              <Text style={styles.title}>Share App</Text>
              <Icon
                name={
                  isShareAppCollapsed
                    ? 'keyboard-arrow-down'
                    : 'keyboard-arrow-up'
                }
                size={24}
                color="#666"
              />
            </View>
          </TouchableOpacity>
          <Collapsible collapsed={isShareAppCollapsed}>
            <TouchableOpacity onPress={shareApp} style={styles.shareButton}>
              <Icon name="share" size={20} color="#fff" />
              <Text style={styles.shareButtonText}>Share with Friends</Text>
            </TouchableOpacity>
          </Collapsible>

          <TouchableOpacity onPress={toggleAboutUs} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Icon name="info" size={24} color="#FF9800" />
              <Text style={styles.title}>About Us</Text>
              <Icon
                name={
                  isAboutUsCollapsed
                    ? 'keyboard-arrow-down'
                    : 'keyboard-arrow-up'
                }
                size={24}
                color="#666"
              />
            </View>
          </TouchableOpacity>
          <Collapsible collapsed={isAboutUsCollapsed}>
            <Text style={styles.content}>
              Welcome to OpenLabBookMobile , your trusted companion in medical
              diagnosis and health management. Your favourite online diagnosis
              booking app in your area at your doorstep only. Book your
              appointment on your desirable LABORATORY and you can also avail
              our home care health service where we provide Home visit Blood
              Collection, ECG, Nursing Staff at your doorstep, On call
              Ambulance. Also you can book your Diagnosis by uploading
              prescription. Our mission is to make health care simple
              accessible, and efficient for everyone whether you need a routine
              checkup, a specialized test, or just want peace of mind we have
              got you covered. Also our mission is to remove AGENTS. It is more
              than just a online medical diagnosis booking app as it allows
              patient to consult with health expert who will give them a right
              direction for treatment for their health related issue. Customer
              can directly book their desirable Nursing Home bed by consulting
              with our expert. With OpenLabBookMobile, you can : • Book
              diagnostic test with ease.\n • Access your desirable LAB and
              Diagnostic Centers at your locality.\n • Schedule Home Sample
              Collection at your convenience.\n • You can book your Diagnosis by
              uploading prescription.\n • Nursing Staff at your doorstep (on
              call).\n • On call Ambulance. • Nursing Home bed by consulting
              with our expert (on call).\n • You can consult with the Certified
              Health Expert regarding your health related issue. We believe in
              empowering individuals to take charge of their Health by providing
              seamless solutions backed by cutting-edge technology and a network
              of trusted healthcare professionals. At OpenLabBookMobile, we are
              not just about convenience -we are about care.
            </Text>
          </Collapsible>

          <TouchableOpacity onPress={toggleTerms} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Icon name="description" size={24} color="#9C27B0" />
              <Text style={styles.title}>Terms and Conditions</Text>
              <Icon
                name={
                  isTermsCollapsed ? 'keyboard-arrow-down' : 'keyboard-arrow-up'
                }
                size={24}
                color="#666"
              />
            </View>
          </TouchableOpacity>
          <Collapsible collapsed={isTermsCollapsed}>
            <Text style={styles.content}>
              Last updated: January 2024{'\n\n'}
              1. Users must be 3+ years or older to use this service{'\n'}
              2. All medical information is confidential and protected{'\n'}
              3. Users are responsible for maintaining account security{'\n'}
              4. Service availability may vary by location{'\n'}
              5. We reserve the right to modify services without notice
            </Text>
          </Collapsible>

          <TouchableOpacity onPress={togglePrivacy} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Icon name="security" size={24} color="#F44336" />
              <Text style={styles.title}>Privacy Policy</Text>
              <Icon
                name={
                  isPrivacyCollapsed
                    ? 'keyboard-arrow-down'
                    : 'keyboard-arrow-up'
                }
                size={24}
                color="#666"
              />
            </View>
          </TouchableOpacity>
          <Collapsible collapsed={isPrivacyCollapsed}>
            <Text style={styles.content}>
              Your data is encrypted and stored securely. We collect only
              essential information needed to provide our services. We never
              share your personal health information with third parties without
              explicit consent. All data processing complies with HIPAA
              regulations and international privacy standards.
            </Text>
          </Collapsible>

          <TouchableOpacity onPress={toggleDeveloper} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Icon name="code" size={24} color="#607D8B" />
              <Text style={styles.title}>Developer</Text>
              <Icon
                name={
                  isDeveloperCollapsed
                    ? 'keyboard-arrow-down'
                    : 'keyboard-arrow-up'
                }
                size={24}
                color="#666"
              />
            </View>
          </TouchableOpacity>
          <Collapsible collapsed={isDeveloperCollapsed}>
            <Text style={styles.content}>
              Developed by{' '}
              <Text
                style={{ color: '#2196F3' }}
                onPress={() => Linking.openURL('https://masterai.fun')}
              >
                MasterAI
              </Text>{' '}
              {'\n'}
              Email:{' '}
              <Text
                onPress={() => Linking.openURL('skjasimuddin9153@gmail.com')}
              >
                skjasimuddin9153@gmail.com
              </Text>
              Version: 1.2.0{'\n'}
              Last Updated: January 2024{'\n\n'}
              Our team of expert developers works tirelessly to bring you the
              best healthcare experience through technology.
            </Text>
          </Collapsible>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default MoreDetails;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  section: {
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginLeft: 10,
    color: '#333',
  },
  content: {
    padding: 15,
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    padding: 15,
    margin: 15,
    borderRadius: 8,
  },
  shareButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
