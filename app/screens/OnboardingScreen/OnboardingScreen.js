import React from 'react';
import {
    View,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Text,
} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { useTheme } from '../../context/ThemeContext';

export const OnboardingScreen = ({ navigation }) => {
    const { theme } = useTheme();

    const handleDone = () => {
        navigation.replace('Login');
    };

    const doneBtn = () => {
        return (
            <TouchableOpacity style={{ marginRight: 20 }} onPress={handleDone}>
                <Text>Done</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Onboarding
                onDone={handleDone}
                onSkip={handleDone}
                bottomBarHighlight={false}
                DoneButtonComponent={doneBtn}
                pages={[
                    {
                        backgroundColor: theme.colors.primary,
                        image: (
                            <Image
                                style={styles.image}
                                source={require('../../shared/assets/images/mock.png')}
                            />
                        ),
                        title: 'Welcome to Konnyaku Apps',
                        subtitle: `Browse through the huge collection of cosplay costumes and easily find your favorite character's costume`,
                    },
                    {
                        backgroundColor: theme.colors.secondary,
                        image: (
                            <Image
                                style={styles.image}
                                source={require('../../shared/assets/images/trust.png')}
                            />
                        ),
                        title: 'Trust is everything',
                        subtitle: `Costume shops and customers upload photos of costumes before delivery and return`,
                    },
                    {
                        backgroundColor: theme.colors.info,
                        image: (
                            <Image
                                style={styles.image}
                                source={require('../../shared/assets/images/refund.png')}
                            />
                        ),
                        title: 'Refund and Fine Systems',
                        subtitle:
                            'If costume shops fail to fulfill the order, customers will receive a refund. Customers will be charged a fine for damaged or unreturned costumes. ',
                    },
                ]}
            />
        </View>
    );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: 300,
        height: 300,
        marginTop: -100,
        resizeMode: 'contain',
    },
});
