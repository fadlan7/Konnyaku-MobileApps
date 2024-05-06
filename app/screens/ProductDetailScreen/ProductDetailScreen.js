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
import Lightbox from 'react-native-lightbox-v2';

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
                paddingVertical: 8,
                borderWidth: 1,
            },
            backButton: {
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: 8,
            },
            containerPrdImage: {
                width: width,
            },
            prdImage: {
                height: 400,
                objectFit: 'contain',
            },
            flatListThumbnail: {
                position: 'absolute',
                top: 300,
                backgroundColor: 'white',
                marginHorizontal: 20,
                paddingVertical: 5,
                borderRadius: 10,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 1,
                elevation: 5,
            },
            imgThumbnail: {
                width: IMAGE_SIZE,
                height: IMAGE_SIZE,
                borderRadius: 12,
                marginRight: 10,
                borderWidth: 2,
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
                        alignItems: 'center',
                    }}
                >
                    <TouchableOpacity>
                        <Ionicons
                            name="heart-outline"
                            size={24}
                            color={theme.colors.text}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ borderWidth: 2 }}>
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
                            <Lightbox>
                                <View style={styles.containerPrdImage}>
                                    <Image
                                        source={{ uri: item.url }}
                                        style={styles.prdImage}
                                    />
                                </View>
                            </Lightbox>
                        );
                    }}
                />
                <FlatList
                    ref={thumbRef}
                    data={images}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.flatListThumbnail}
                    contentContainerStyle={{ paddingHorizontal: SPACING }}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => scrollToActiveIndex(index)}
                            >
                                <Image
                                    source={{ uri: item.url }}
                                    style={[
                                        styles.imgThumbnail,
                                        {
                                            borderColor:
                                                activeIndex === index
                                                    ? '#000'
                                                    : 'transparent',
                                        },
                                    ]}
                                />
                            </TouchableOpacity>
                        );
                    }}
                />
            </View>
        </View>
    );
};
