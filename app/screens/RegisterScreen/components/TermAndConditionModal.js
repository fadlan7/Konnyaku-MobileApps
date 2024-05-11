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
                },
                customBtn: {
                    marginTop: 10,
                    backgroundColor: theme.colors.primary,
                    padding: 10,
                    borderRadius: 10,
                    alignItems: 'center',
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
                    <Text>
                        Isi Syarat & Ketentuannya adaalaklaskalks
                        allowsEditingaslkasl allowsEditingaslkasl
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
