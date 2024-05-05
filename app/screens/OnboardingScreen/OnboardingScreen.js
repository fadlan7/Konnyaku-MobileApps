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
                                source={require('../../shared/assets/images/without-bg.png')}
                            />
                        ),
                        title: 'Onboarding',
                        subtitle: 'Done with React Native Onboarding Swiper',
                    },
                    {
                        backgroundColor: theme.colors.secondary,
                        image: (
                            <Image
                                style={styles.image}
                                source={require('../../shared/assets/images/without-bg.png')}
                            />
                        ),
                        title: 'Onboarding',
                        subtitle: 'Done with React Native Onboarding Swiper',
                    },
                    {
                        backgroundColor: theme.colors.info,
                        image: (
                            <Image
                                style={styles.image}
                                source={require('../../shared/assets/images/without-bg.png')}
                            />
                        ),
                        title: 'Onboarding',
                        subtitle: 'Done with React Native Onboarding Swiper',
                    },
                ]}
            />
        </View>
    );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: width,
        height: width,
        resizeMode: 'contain',
    },
});
