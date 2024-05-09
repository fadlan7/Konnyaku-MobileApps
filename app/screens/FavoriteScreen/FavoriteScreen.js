import React, { useCallback, useMemo, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { View, TouchableOpacity, ImageBackground, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useTheme } from '../../context/ThemeContext';
import { RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { currencyFormat } from '../../utils/currencyFormat';
import { Image } from 'react-native';

export const FavoriteScreen = ({ navigation }) => {
    const { theme } = useTheme();
    const [refreshing, setRefreshing] = useState(false);
    const { width, height } = Dimensions.get('window');

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    const [dummyData, setDummyData] = useState([
        {
            id: '1',
            name: 'Beng Beng',
            vendorName: 'ABC Store',
            price: 3000,
            stock: 30,
            description:
                'Beng Beng adalah salah satu merek wafer coklat yang diproduksi oleh Mayora.',
            images: [
                {
                    id: '1',
                    name: 'beng-beng',
                    url: 'https://img.ws.mms.shopee.co.id/db572b217ce298e397ea8fc452302f8a',
                },
                {
                    id: '2',
                    name: 'beng-beng',
                    url: 'https://img.ws.mms.shopee.co.id/db572b217ce298e397ea8fc452302f8a',
                },
                {
                    id: '3',
                    name: 'beng-beng',
                    url: 'https://img.ws.mms.shopee.co.id/db572b217ce298e397ea8fc452302f8a',
                },
                {
                    id: '4',
                    name: 'beng-beng',
                    url: 'https://img.ws.mms.shopee.co.id/db572b217ce298e397ea8fc452302f8a',
                },
                {
                    id: '5',
                    name: 'beng-beng',
                    url: 'https://img.ws.mms.shopee.co.id/db572b217ce298e397ea8fc452302f8a',
                },
                {
                    id: '6',
                    name: 'beng-beng',
                    url: 'https://img.ws.mms.shopee.co.id/db572b217ce298e397ea8fc452302f8a',
                },
            ],
        },
        {
            id: '2',
            name: 'Detol Sabun Mandi Cair Cool 370 g',
            vendorName: 'ZZZ Store',
            price: 32900,
            stock: 10,
            description:
                'Sabun Mandi Cair Dettol Cool merupakan sabun cair anti bakteri untuk memberikan perlindungan keluarga anda setiap harinya dari kuman penyebab timbulnya bau badan serta memberikan sensasi mentol yang menyegarkan.',
            images: [
                {
                    id: '1',
                    name: 'detol-cool-370g',
                    url: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/catalog-image/MTA-16726020/dettol_dettol_sabun_mandi_cair_cool_370_g_full02_p0k26hsn.jpeg',
                },
                {
                    id: '2',
                    name: 'detol-cool-370g',
                    url: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/catalog-image/MTA-16726020/dettol_dettol_sabun_mandi_cair_cool_370_g_full02_p0k26hsn.jpeg',
                },
                {
                    id: '3',
                    name: 'detol-cool-370g',
                    url: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/catalog-image/MTA-16726020/dettol_dettol_sabun_mandi_cair_cool_370_g_full02_p0k26hsn.jpeg',
                },
                {
                    id: '4',
                    name: 'detol-cool-370g',
                    url: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/catalog-image/MTA-16726020/dettol_dettol_sabun_mandi_cair_cool_370_g_full02_p0k26hsn.jpeg',
                },
                {
                    id: '5',
                    name: 'detol-cool-370g',
                    url: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/catalog-image/MTA-16726020/dettol_dettol_sabun_mandi_cair_cool_370_g_full02_p0k26hsn.jpeg',
                },
                {
                    id: '6',
                    name: 'detol-cool-370g',
                    url: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/catalog-image/MTA-16726020/dettol_dettol_sabun_mandi_cair_cool_370_g_full02_p0k26hsn.jpeg',
                },
            ],
        },
        {
            id: '3',
            name: "Wall's Cornetto Es Krim Kopi Karamel 80 ml",
            vendorName: 'ABC Store',
            price: 6300,
            stock: 15,
            description:
                'Es Susu Rasa Kopi dan Karamel dengan saus Cokelat dan Butiran Cokelat. Cara Penyimpanan : Simpan pada suhu beku di bawah -18C.',
            images: [
                {
                    id: '1',
                    name: 'walls-cornetto',
                    url: 'https://assets.klikindomaret.com/products/20128054/20128054_1.jpg',
                },
                {
                    id: '2',
                    name: 'walls-cornetto',
                    url: 'https://assets.klikindomaret.com/products/20128054/20128054_1.jpg',
                },
                {
                    id: '3',
                    name: 'walls-cornetto',
                    url: 'https://assets.klikindomaret.com/products/20128054/20128054_1.jpg',
                },
                {
                    id: '4',
                    name: 'walls-cornetto',
                    url: 'https://assets.klikindomaret.com/products/20128054/20128054_1.jpg',
                },
                {
                    id: '5',
                    name: 'walls-cornetto',
                    url: 'https://assets.klikindomaret.com/products/20128054/20128054_1.jpg',
                },
                {
                    id: '6',
                    name: 'walls-cornetto',
                    url: 'https://assets.klikindomaret.com/products/20128054/20128054_1.jpg',
                },
            ],
        },
        {
            id: '4',
            name: 'Pringles Potato Crisps Original 102 g',
            vendorName: 'Alfa Store',
            price: 27300,
            stock: 20,
            description:
                'Pringles Potato Crisps Original adalah salah satu varian keripik kentang Pringles. Dengan teksturnya yang tebal dan berbentuk pelana, keripik kentang ini disusun dalam sebuah tabung berlapis alumunium foil yang tertutup rapat sehingga terjaga kerenyahan dan keutuhannya. Anda akan merasakan kelezatan yang tebal dan utuh dalam setiap tabungnya. Rasa gurih asinnya yang istimewa akan menjadikan keripik kentang ini menjadi makanan ringat favorit Anda karena bumbunya yang unik dan merata ke seluruh keripik kentang yang ada dalam tabungnya. Rasakan serunya banyak hal dalam hidup Anda bersama kerenyahan asli kentang dari Pringles Potato Crisps Original',
            images: [
                {
                    id: '1',
                    name: 'Pringles-potato-crisp-ori',
                    url: 'https://images.tokopedia.net/img/cache/700/VqbcmM/2023/9/8/c59a2f32-941f-4c33-9f29-fd238394e6a3.png',
                },
                {
                    id: '2',
                    name: 'Pringles-potato-crisp-ori',
                    url: 'https://images.tokopedia.net/img/cache/700/VqbcmM/2023/9/8/c59a2f32-941f-4c33-9f29-fd238394e6a3.png',
                },
                {
                    id: '3',
                    name: 'Pringles-potato-crisp-ori',
                    url: 'https://images.tokopedia.net/img/cache/700/VqbcmM/2023/9/8/c59a2f32-941f-4c33-9f29-fd238394e6a3.png',
                },
                {
                    id: '4',
                    name: 'Pringles-potato-crisp-ori',
                    url: 'https://images.tokopedia.net/img/cache/700/VqbcmM/2023/9/8/c59a2f32-941f-4c33-9f29-fd238394e6a3.png',
                },
                {
                    id: '5',
                    name: 'Pringles-potato-crisp-ori',
                    url: 'https://images.tokopedia.net/img/cache/700/VqbcmM/2023/9/8/c59a2f32-941f-4c33-9f29-fd238394e6a3.png',
                },
                {
                    id: '6',
                    name: 'Pringles-potato-crisp-ori',
                    url: 'https://images.tokopedia.net/img/cache/700/VqbcmM/2023/9/8/c59a2f32-941f-4c33-9f29-fd238394e6a3.png',
                },
                {
                    id: '7',
                    name: 'Pringles-potato-crisp-ori',
                    url: 'https://images.tokopedia.net/img/cache/700/VqbcmM/2023/9/8/c59a2f32-941f-4c33-9f29-fd238394e6a3.png',
                },
            ],
        },
        {
            id: '5',
            name: "Wall's Cornetto Es Krim Kopi Karamel 80 ml",
            vendorName: 'ABC Store',
            price: 6300,
            stock: 15,
            description:
                'Es Susu Rasa Kopi dan Karamel dengan saus Cokelat dan Butiran Cokelat. Cara Penyimpanan : Simpan pada suhu beku di bawah -18C.',
            images: [
                {
                    id: '1',
                    name: 'walls-cornetto',
                    url: 'https://assets.klikindomaret.com/products/20128054/20128054_1.jpg',
                },
                {
                    id: '2',
                    name: 'walls-cornetto',
                    url: 'https://assets.klikindomaret.com/products/20128054/20128054_1.jpg',
                },
                {
                    id: '3',
                    name: 'walls-cornetto',
                    url: 'https://assets.klikindomaret.com/products/20128054/20128054_1.jpg',
                },
                {
                    id: '4',
                    name: 'walls-cornetto',
                    url: 'https://assets.klikindomaret.com/products/20128054/20128054_1.jpg',
                },
                {
                    id: '5',
                    name: 'walls-cornetto',
                    url: 'https://assets.klikindomaret.com/products/20128054/20128054_1.jpg',
                },
                {
                    id: '6',
                    name: 'walls-cornetto',
                    url: 'https://assets.klikindomaret.com/products/20128054/20128054_1.jpg',
                },
            ],
        },
        {
            id: '6',
            name: 'Pringles Potato Crisps Original 102 g',
            vendorName: 'Alfa Store',
            price: 27300,
            stock: 20,
            description:
                'Pringles Potato Crisps Original adalah salah satu varian keripik kentang Pringles. Dengan teksturnya yang tebal dan berbentuk pelana, keripik kentang ini disusun dalam sebuah tabung berlapis alumunium foil yang tertutup rapat sehingga terjaga kerenyahan dan keutuhannya. Anda akan merasakan kelezatan yang tebal dan utuh dalam setiap tabungnya. Rasa gurih asinnya yang istimewa akan menjadikan keripik kentang ini menjadi makanan ringat favorit Anda karena bumbunya yang unik dan merata ke seluruh keripik kentang yang ada dalam tabungnya. Rasakan serunya banyak hal dalam hidup Anda bersama kerenyahan asli kentang dari Pringles Potato Crisps Original',
            images: [
                {
                    id: '1',
                    name: 'Pringles-potato-crisp-ori',
                    url: 'https://images.tokopedia.net/img/cache/700/VqbcmM/2023/9/8/c59a2f32-941f-4c33-9f29-fd238394e6a3.png',
                },
                {
                    id: '2',
                    name: 'Pringles-potato-crisp-ori',
                    url: 'https://images.tokopedia.net/img/cache/700/VqbcmM/2023/9/8/c59a2f32-941f-4c33-9f29-fd238394e6a3.png',
                },
                {
                    id: '3',
                    name: 'Pringles-potato-crisp-ori',
                    url: 'https://images.tokopedia.net/img/cache/700/VqbcmM/2023/9/8/c59a2f32-941f-4c33-9f29-fd238394e6a3.png',
                },
                {
                    id: '4',
                    name: 'Pringles-potato-crisp-ori',
                    url: 'https://images.tokopedia.net/img/cache/700/VqbcmM/2023/9/8/c59a2f32-941f-4c33-9f29-fd238394e6a3.png',
                },
                {
                    id: '5',
                    name: 'Pringles-potato-crisp-ori',
                    url: 'https://images.tokopedia.net/img/cache/700/VqbcmM/2023/9/8/c59a2f32-941f-4c33-9f29-fd238394e6a3.png',
                },
                {
                    id: '6',
                    name: 'Pringles-potato-crisp-ori',
                    url: 'https://images.tokopedia.net/img/cache/700/VqbcmM/2023/9/8/c59a2f32-941f-4c33-9f29-fd238394e6a3.png',
                },
            ],
        },
    ]);

    const styles = useMemo(() =>
        StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: theme.colors.background,
                paddingHorizontal: 15,
            },
            cardContainer: {
                marginVertical: 15,
                width: width,
                flexDirection: 'row',
                alignItems: 'center',
            },
            horizontalSeparator: {
                borderWidth: 0.5,
                borderColor: theme.colors.grey,
            },
            prdImage: {
                width: 100,
                height: 100,
                objectFit: 'contain',
                borderRadius: 10,
                borderWidth: 1,
                borderColor: theme.colors.grey,
                overflow: 'hidden',
            },
            prdDescContainer: {
                justifyContent: 'space-around',
                marginLeft: 10,
                paddingVertical: 10,
                width: '50%',
            },
            favButton: {
                backgroundColor: theme.colors.primary,
                elevation: 5,
                padding: 5,
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
                fontFamily: 'poppins-regular',
                fontSize: 14,
            },
        })
    );

    return (
        <View style={styles.container}>
            <FlatList
                ItemSeparatorComponent={
                    <View style={styles.horizontalSeparator} />
                }
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                data={dummyData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('ProductDetail', item)
                            }
                            style={styles.cardContainer}
                        >
                            <Image
                                source={{ uri: item.images[0].url }}
                                alt={item.images[0].name}
                                style={styles.prdImage}
                            />

                            <View style={styles.prdDescContainer}>
                                <Text numberOfLines={1} style={styles.prdName}>
                                    {item.name}
                                </Text>
                                <Text style={styles.prdPrice}>
                                    {currencyFormat(item.price)}
                                </Text>

                                <View style={styles.vendorNameContainer}>
                                    <Text style={styles.vendorName}>
                                        {item.vendorName}
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.favButton}>
                                <Ionicons
                                    name="heart-outline"
                                    size={30}
                                    color={theme.colors.grey}
                                />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
};
