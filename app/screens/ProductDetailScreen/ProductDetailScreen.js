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
import { currencyFormat, url } from '../../utils/currencyFormat';
import CustomButton from '../../shared/components/CustomButton';
import LocalStorage from '../../utils/LocalStorage';
import { Alert } from 'react-native';
import UserService from '../../services/konnyakuApi/UserService';

export const ProductDetailScreen = ({ route, navigation }) => {
    const { theme } = useTheme();
    const {id, name, description, priceAmount, weight, details, thumbnail, shop } =
        route.params;
    const { width, height } = Dimensions.get('window');
    const [activeIndex, setActiveIndex] = useState(0);
    const [userAccountId, setUserAccountId] = useState(null);
    const [userId, setUserId] = useState(null);
    const [user, setUser] = useState(null);
    const localStorage = LocalStorage();
    const userService = useMemo(() => UserService(), []);
    const IMAGE_SIZE = 80;
    const SPACING = 10;

    const topRef = useRef(null);
    const thumbRef = useRef(null);

    const setId = async () => {
        const userAccountId = await localStorage.getData('userAccountId');
        setUserAccountId(userAccountId);
    };

    const getUserId = async () => {
        try {
            const userId = await userService.getUserIdByAccountId(
                userAccountId
            );
            setUserId(userId.data.id);
        } catch (error) {
            // Alert.alert(error);
        }
    };

    const fetchUserData = async () => {
        try {
            const data = await userService.getUserByUserId(userId);
            setUser(data.data);
        } catch (error) {
            // Alert.alert(error);
        }
    };

    useEffect(() => {
        setId();
    }, []);

    useEffect(() => {
        if (userAccountId) {
            getUserId();
        }
    }, [userAccountId]);

    useEffect(() => {
        if (userId) {
            fetchUserData();
        }
    }, [userId]);

    const data = {
        id,
        name,
        description,
        priceAmount,
        weight,
        details,
        thumbnail,
        shop,
        user,
        userAccountId
    };

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

    const HtmlRenderStyle = {
        p: {
            fontFamily: 'poppins-bold',
            fontSize: 16,
        },
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
            },
            backButton: {
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: 8,
            },
            bottomSheetContainer: {
                width: '100%',
                height: 60,
                elevation: 1,
                paddingHorizontal: 20,
                backgroundColor: theme.colors.background,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                borderWidth: 1,
                borderColor: theme.colors.primary,
                borderTopStartRadius: 10,
                borderTopEndRadius: 10,
                bottom: 0,
                zIndex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
            },
            lightboxContainer: {
                borderBottomWidth: 0.5,
                borderBlockColor: theme.colors.primary,
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
                alignSelf: 'center',
            },
            imgThumbnail: {
                width: IMAGE_SIZE,
                height: IMAGE_SIZE,
                borderRadius: 12,
                marginRight: 10,
                borderWidth: 1,
                borderColor: theme.colors.secondary,
            },
            customBtn: {
                backgroundColor: theme.colors.primary,
                padding: 10,
                borderRadius: 20,
                alignItems: 'center',
            },
            imgDetail: {
                width: 200,
                height: 200,
                borderRadius: 12,
                marginRight: 10,
                borderWidth: 1,
                borderColor: theme.colors.secondary,
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
            </View>
            <View style={styles.bottomSheetContainer}>
                <View>
                    <Text style={{ fontFamily: 'poppins-light' }}>
                        Total price
                    </Text>
                    <Text style={{ fontFamily: 'poppins-semibold' }}>
                        {currencyFormat(priceAmount)}
                    </Text>
                </View>
                <CustomButton
                    title="Checkout"
                    color="#fff"
                    fontFamily="poppins-semibold"
                    fontSize={14}
                    style={styles.customBtn}
                    onPress={() => navigation.navigate('Checkout', data)}
                />
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View>
                        <FlatList
                            ref={topRef}
                            data={details}
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
                                    <View>
                                        <Lightbox
                                            style={styles.lightboxContainer}
                                        >
                                            <View
                                                style={styles.containerPrdImage}
                                            >
                                                <Image
                                                    source={{
                                                        uri: `${url}${item.image.url}`,
                                                    }}
                                                    style={styles.prdImage}
                                                />
                                            </View>
                                        </Lightbox>
                                        <View style={{ paddingHorizontal: 20 }}>
                                            <Text
                                                style={{
                                                    fontFamily:
                                                        'poppins-semibold',
                                                    fontSize: 20,
                                                }}
                                            >
                                                {item.name}
                                            </Text>
                                            <Text
                                                style={{
                                                    fontFamily: 'poppins-bold',
                                                    fontSize: 18,
                                                    marginBottom: -10,
                                                }}
                                            >
                                                {item.price}
                                            </Text>
                                            <RenderHTML
                                                contentWidth={width}
                                                source={{
                                                    html: `${item.description}`,
                                                }}
                                                tagsStyles={HtmlRenderStyle}
                                            />
                                        </View>
                                    </View>
                                );
                            }}
                        />
                        <FlatList
                            ref={thumbRef}
                            data={details}
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
                                            source={{
                                                uri: `${url}${item.image.url}`,
                                            }}
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
                                paddingBottom: 80,
                            }}
                        >
                            <View
                                style={{
                                    width: '100%',
                                    borderBottomWidth: 1,
                                    borderBottomColor: theme.colors.primary,
                                    marginBottom: 10,
                                }}
                            />
                            <Text
                                style={{
                                    fontSize: 18,
                                    fontFamily: 'poppins-bold',
                                    color: theme.colors.text,
                                }}
                            >
                                {name}
                            </Text>
                            <Image
                                source={{
                                    uri: `${url}${thumbnail.url}`,
                                }}
                                style={[styles.imgDetail]}
                            />
                            <Text
                                style={{
                                    fontSize: 18,
                                    fontFamily: 'poppins-regular',
                                    color: theme.colors.text,
                                    marginTop: 10,
                                    marginBottom: -10,
                                }}
                            >
                                Product Description
                            </Text>
                            <RenderHTML
                                contentWidth={width}
                                source={{
                                    html: `${description}`,
                                }}
                                tagsStyles={HtmlRenderStyle}
                            />
                        </View>
                    </>
                }
            />
        </View>
    );
};
