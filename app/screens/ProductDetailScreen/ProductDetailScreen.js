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
                    // <RenderHTML
                    //     contentWidth={width}
                    //     source={{
                    //         html: `<div style="max-width: 40rem; margin: 0 auto; color: #17224f;">
                    //     <h1 style="line-height: 1.3; font-size: 40px; margin: 3rem 0 0;">Familiar. Fully-featu'red. <br>Built for React.</h1>
                    //     <p style="line-height: 1.5;">With over 120,000 installs per week, it\'s already proven. <br>TinyMCEs React integration is a breeze. TinyMCE is feature-rich <br>for users and delivers the flexibility developers demand.</p>                    <div style="width: 100%; display: flex; flex-wrap: wrap;"><div style="flex: 1;"><p style="line-height: 1.5;">Use TinyMCE React WYSIWYG editor as:</p>                    <ul><li style="margin: 10px 0;"><span style="font-size: 18px;">A <strong>basic</strong> editor</span></li><li style="margin: 10px 0;"><span style="font-size: 18px;">An advanced 📝 editor</span></li><li style="margin: 10px 0;"><span style="font-size: 18px;">An AI-powered 🪄✨ editor </span></li>                    <li style="margin: 10px 0;"><span style="font-size: 18px;">A {{template-based}} editor</span></li>                    <li style="margin: 10px 0;"><span style="font-size: 18px;">A totally <span style="color: #00bc84; font-size: 16px;"><code>&lt;customized&gt;</code></span> editor</span></li></ul>                    <p style="font-size: 18px; color: #17224f; line-height: 1.3;"><strong>Play with this demo to see how it works</strong></p>                    </div><div><img class="frameworks-logo" style="max-width: 100%; margin-top: 50px;" role="presentation" src="blob:https://www.tiny.cloud/b44f9e00-9c6a-4d48-96e8-039080fd6e7b" alt="React Logo" width="147"></div></div></div>`,
                    //     }}
                    // />
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
                                marginTop: 20
                            }}
                        >
                            Product Details
                        </Text>
                        <Text>{description}</Text>
                        <Text>{vendorName}</Text>
                    </View>
                }
            />
        </View>
    );
};
