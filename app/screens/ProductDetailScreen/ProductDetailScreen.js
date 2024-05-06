import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Image,
    Dimensions,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

export const ProductDetailScreen = ({ route, navigation }) => {
    const { theme } = useTheme();
    const { id, name, price, description, images } = route.params;
    const { width, height } = Dimensions.get('window');
    const [activeIndex, setActiveIndex] = useState(0);
    const IMAGE_SIZE = 80;
    const SPACING = 10;

    const topRef = useRef(null);
    const thumbRef = useRef(null);

    const scrollToActiveIndex = (index) => {
        setActiveIndex(index);

        topRef?.current?.scrollToOffset({
            offset: index * width,
            animated: true,
        });

        if (index * (IMAGE_SIZE + SPACING) - IMAGE_SIZE / 2 > width / 2) {
            thumbRef?.current?.scrollToOffset({
                offset:
                    index * (IMAGE_SIZE + SPACING) - width / 2 + IMAGE_SIZE / 2,
                animated: true,
            });
        } else {
            thumbRef?.current?.scrollToOffset({
                offset: 0,
                animated: true,
            });
        }
    };

    const styles = useMemo(() =>
        StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: theme.colors.background,
            },
            headerContainer: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 12,
                marginBottom: 12,
                marginTop: 8,
                borderWidth: 1,
            },
            backButton: {
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: 8,
            },
            containerPrdImage: {
                width: width,
                height: 400,
            },
            cardContainer: {
                marginBottom: 10,
                width: '48%',
            },
            prdImage: {
                width: '100%',
                height: 200,
                objectFit: 'cover',
                borderRadius: 10,
                borderWidth: 1,
                borderColor: theme.colors.grey,
            },
            favButton: {
                position: 'absolute',
                top: 10,
                right: 10,
                backgroundColor: theme.colors.secondary,
                paddingHorizontal: 5,
                paddingVertical: 5,
                borderRadius: 50,
            },
            prdName: {
                fontFamily: 'poppins-regular',
                fontSize: 14,
            },
            prdPrice: {
                fontFamily: 'poppins-semibold',
                fontSize: 16,
            },
            vendorNameContainer: {
                flexDirection: 'row',
            },
            vendorName: {
                marginLeft: 5,
                fontFamily: 'poppins-regular',
                fontSize: 14,
            },
        })
    );
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Ionicons name="arrow-back" size={24} />
                </TouchableOpacity>
                <View
                    style={{
                        flexDirection: 'row',
                        columnGap: 16,
                        alignItems: 'center',
                    }}
                >
                    <TouchableOpacity>
                        <Ionicons
                            name="share-social"
                            size={18}
                            color={theme.colors.text}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ backgroundColor: 'yellow', borderWidth: 2 }}>
                <FlatList
                    ref={topRef}
                    data={images}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={(ev) => {
                        scrollToActiveIndex(
                            Math.floor(ev.nativeEvent.contentOffset.x / width)
                        );
                    }}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.containerPrdImage}>
                                <Image
                                    source={{ uri: item.url }}
                                    style={[StyleSheet.absoluteFillObject]}
                                />
                            </View>
                        );
                    }}
                />
                <FlatList
                    ref={thumbRef}
                    data={images}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ position: 'absolute', top: 300 }}
                    contentContainerStyle={{ paddingHorizontal: SPACING }}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => scrollToActiveIndex(index)}
                            >
                                <Image
                                    source={{ uri: item.url }}
                                    style={{
                                        width: IMAGE_SIZE,
                                        height: IMAGE_SIZE,
                                        borderRadius: 12,
                                        marginRight: 10,
                                        borderWidth: 2,
                                        borderColor:
                                            activeIndex === index
                                                ? '#000'
                                                : 'transparent',
                                    }}
                                />
                            </TouchableOpacity>
                        );
                    }}
                />
            </View>
        </View>
    );
};
