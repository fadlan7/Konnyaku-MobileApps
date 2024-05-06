import React, { useCallback, useMemo, useState } from 'react';
import {
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import CustomTextInput from '../../shared/components/CustomTextInput';
import { Ionicons } from '@expo/vector-icons';
import { currencyFormat } from '../../utils/currencyFormat';
import { ImageBackground } from 'react-native';

export const HomeScreen = ({ navigation }) => {
    const { theme } = useTheme();
    const [refreshing, setRefreshing] = useState(false);

    const [dummyData, setDummyData] = useState([
        {
            id: '1',
            name: 'Beng Beng',
            vendorName: 'ABC Store',
            price: 3000,
            stock: 30,
            description:
                'Beng Beng adalah salah satu merek wafer coklat yang diproduksi oleh Mayora.',
            image: {
                name: 'beng-beng',
                url: 'https://img.ws.mms.shopee.co.id/db572b217ce298e397ea8fc452302f8a',
            },
        },
        {
            id: '2',
            name: 'Detol Sabun Mandi Cair Cool 370 g',
            vendorName: 'ZZZ Store',
            price: 32900,
            stock: 10,
            description:
                'Sabun Mandi Cair Dettol Cool merupakan sabun cair anti bakteri untuk memberikan perlindungan keluarga anda setiap harinya dari kuman penyebab timbulnya bau badan serta memberikan sensasi mentol yang menyegarkan.',
            image: {
                name: 'detol-cool-370g',
                url: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/catalog-image/MTA-16726020/dettol_dettol_sabun_mandi_cair_cool_370_g_full02_p0k26hsn.jpeg',
            },
        },
        {
            id: '3',
            name: "Wall's Cornetto Es Krim Kopi Karamel 80 ml",
            vendorName: 'ABC Store',
            price: 6300,
            stock: 15,
            description:
                'Es Susu Rasa Kopi dan Karamel dengan saus Cokelat dan Butiran Cokelat. Cara Penyimpanan : Simpan pada suhu beku di bawah -18C.',
            image: {
                name: 'walls-cornetto',
                url: 'https://assets.klikindomaret.com/products/20128054/20128054_1.jpg',
            },
        },
        {
            id: '4',
            name: 'Pringles Potato Crisps Original 102 g',
            vendorName: 'Alfa Store',
            price: 27300,
            stock: 20,
            description:
                'Pringles Potato Crisps Original adalah salah satu varian keripik kentang Pringles. Dengan teksturnya yang tebal dan berbentuk pelana, keripik kentang ini disusun dalam sebuah tabung berlapis alumunium foil yang tertutup rapat sehingga terjaga kerenyahan dan keutuhannya. Anda akan merasakan kelezatan yang tebal dan utuh dalam setiap tabungnya. Rasa gurih asinnya yang istimewa akan menjadikan keripik kentang ini menjadi makanan ringat favorit Anda karena bumbunya yang unik dan merata ke seluruh keripik kentang yang ada dalam tabungnya. Rasakan serunya banyak hal dalam hidup Anda bersama kerenyahan asli kentang dari Pringles Potato Crisps Original',
            image: {
                name: 'Pringles-potato-crisp-ori',
                url: 'https://images.tokopedia.net/img/cache/700/VqbcmM/2023/9/8/c59a2f32-941f-4c33-9f29-fd238394e6a3.png',
            },
        },
        {
            id: '5',
            name: "Wall's Cornetto Es Krim Kopi Karamel 80 ml",
            vendorName: 'ABC Store',
            price: 6300,
            stock: 15,
            description:
                'Es Susu Rasa Kopi dan Karamel dengan saus Cokelat dan Butiran Cokelat. Cara Penyimpanan : Simpan pada suhu beku di bawah -18C.',
            image: {
                name: 'walls-cornetto',
                url: 'https://assets.klikindomaret.com/products/20128054/20128054_1.jpg',
            },
        },
        {
            id: '6',
            name: 'Pringles Potato Crisps Original 102 g',
            vendorName: 'Alfa Store',
            price: 27300,
            stock: 20,
            description:
                'Pringles Potato Crisps Original adalah salah satu varian keripik kentang Pringles. Dengan teksturnya yang tebal dan berbentuk pelana, keripik kentang ini disusun dalam sebuah tabung berlapis alumunium foil yang tertutup rapat sehingga terjaga kerenyahan dan keutuhannya. Anda akan merasakan kelezatan yang tebal dan utuh dalam setiap tabungnya. Rasa gurih asinnya yang istimewa akan menjadikan keripik kentang ini menjadi makanan ringat favorit Anda karena bumbunya yang unik dan merata ke seluruh keripik kentang yang ada dalam tabungnya. Rasakan serunya banyak hal dalam hidup Anda bersama kerenyahan asli kentang dari Pringles Potato Crisps Original',
            image: {
                name: 'Pringles-potato-crisp-ori',
                url: 'https://images.tokopedia.net/img/cache/700/VqbcmM/2023/9/8/c59a2f32-941f-4c33-9f29-fd238394e6a3.png',
            },
        },
    ]);

    const styles = useMemo(() =>
        StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: theme.colors.background,
                padding: 15,
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

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    return (
        <View style={styles.container}>
            <View>
                <CustomTextInput
                    preIcon={
                        <Ionicons
                            name="search-outline"
                            size={16}
                            style={{ marginHorizontal: 8 }}
                        />
                    }
                />
            </View>
            <View>
                <FlatList
                    contentContainerStyle={{ paddingBottom: 24 }}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    numColumns={2}
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
                                <View>
                                    <ImageBackground
                                        source={{ uri: item.image.url }}
                                        alt={item.image.name}
                                        style={styles.prdImage}
                                    >
                                        <TouchableOpacity
                                            style={styles.favButton}
                                        >
                                            <Ionicons
                                                name="heart-outline"
                                                size={24}
                                                color={theme.colors.grey}
                                            />
                                        </TouchableOpacity>
                                    </ImageBackground>
                                </View>
                                <View>
                                    <Text style={styles.prdName}>
                                        {item.name}
                                    </Text>
                                    <Text style={styles.prdPrice}>
                                        {currencyFormat(item.price)}
                                    </Text>

                                    <View style={styles.vendorNameContainer}>
                                        <Ionicons
                                            name="storefront"
                                            size={16}
                                            color={theme.colors.secondary}
                                        />
                                        <Text style={styles.vendorName}>
                                            {item.vendorName}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                />
            </View>
        </View>
    );
};
