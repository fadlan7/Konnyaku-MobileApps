import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Image,
    Dimensions,
    ScrollView,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import Lightbox from 'react-native-lightbox-v2';
import RenderHTML from 'react-native-render-html';

export const ProductDetailScreen = ({ route, navigation }) => {
    const { theme } = useTheme();
    const { id, name, price, description, images, vendorName } = route.params;
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

            <FlatList
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View style={{ borderWidth: 2 }}>
                        <FlatList
                            ref={topRef}
                            data={images}
                            keyExtractor={(item) => item.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            onMomentumScrollEnd={(ev) => {
                                scrollToActiveIndex(
                                    Math.floor(
                                        ev.nativeEvent.contentOffset.x / width
                                    )
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
                            contentContainerStyle={{
                                paddingHorizontal: SPACING,
                            }}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() =>
                                            scrollToActiveIndex(index)
                                        }
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
                }
                ListFooterComponent={
                    <>
                        <View
                            style={{
                                paddingHorizontal: 20,
                                marginTop: 20,
                                backgroundColor: 'yellow',
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 18,
                                    fontFamily: 'poppins-bold',
                                    color: theme.colors.text,
                                }}
                            >
                                {name}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 18,
                                    fontFamily: 'poppins-semibold',
                                    color: theme.colors.text,
                                    marginTop: 20,
                                }}
                            >
                                Product Details
                            </Text>
                            <Text>{description}</Text>
                            <Text>{vendorName}</Text>
                        </View>
                        <RenderHTML
                            contentWidth={width}
                            source={{
                                html: `<h1>Nama Produk</h1>
                                <p>Deskripsi singkat tentang produk ini akan memberikan gambaran kepada pelanggan tentang fitur, manfaat, dan nilai yang ditawarkan oleh produk.</p>
                                
                                <h2>Fitur Utama:</h2>
                                <ul>
                                    <li>Fitur 1: Deskripsi singkat tentang fitur 1.</li>
                                    <li>Fitur 2: Deskripsi singkat tentang fitur 2.</li>
                                    <li>Fitur 3: Deskripsi singkat tentang fitur 3.</li>
                                </ul>
                                
                                <h2>Manfaat:</h2>
                                <p>Produk ini akan membantu pelanggan dalam hal-hal berikut:</p>
                                <ul>
                                    <li>Manfaat 1: Deskripsi singkat tentang manfaat 1.</li>
                                    <li>Manfaat 2: Deskripsi singkat tentang manfaat 2.</li>
                                    <li>Manfaat 3: Deskripsi singkat tentang manfaat 3.</li>
                                </ul>
                                
                                <h2>Spesifikasi Teknis:</h2>
                                <table>
                                    <tr>
                                        <th>Spesifikasi</th>
                                        <th>Detail</th>
                                    </tr>
                                    <tr>
                                        <td>Spesifikasi 1</td>
                                        <td>Detail spesifikasi 1</td>
                                    </tr>
                                    <tr>
                                        <td>Spesifikasi 2</td>
                                        <td>Detail spesifikasi 2</td>
                                    </tr>
                                    <tr>
                                        <td>Spesifikasi 3</td>
                                        <td>Detail spesifikasi 3</td>
                                    </tr>
                                </table>
                                
                                <p>Harga: <strong>RpXXX,XXX</strong></p>
                                <p>Untuk informasi lebih lanjut atau pembelian, silakan <a href="kontak.html">hubungi kami</a>.</p>`,
                            }}
                        />
                    </>
                }
            />
        </View>
    );
};
