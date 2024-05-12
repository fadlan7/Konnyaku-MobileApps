import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    Alert,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import CustomTextInput from '../../shared/components/CustomTextInput';
import { Ionicons } from '@expo/vector-icons';
import { currencyFormat } from '../../utils/currencyFormat';
import { ImageBackground } from 'react-native';
import AuthService from '../../services/konnyakuApi/AuthService';
import { TextInput } from 'react-native';
import { Button } from 'react-native';
import axios from 'axios';
import { ActivityIndicator } from 'react-native';
import apiClient from '../../services/konnyakuApi/apiClient';
import { isLoaded } from 'expo-font';
import ProductService from '../../services/konnyakuApi/ProductService';

export const HomeScreen = ({ navigation }) => {
    // const { theme } = useTheme();
    // const [refreshing, setRefreshing] = useState(false);
    // const authService = AuthService();
    // const [dummyData, setDummyData] = useState([
    //     {
    //         id: '1',
    //         name: 'Beng Beng',
    //         vendorName: 'ABC Store',
    //         price: 3000,
    //         stock: 30,
    //         description:
    //             'Beng Beng adalah salah satu merek wafer coklat yang diproduksi oleh Mayora.',
    //         images: [
    //             {
    //                 id: '1',
    //                 name: 'beng-beng',
    //                 url: 'https://img.ws.mms.shopee.co.id/db572b217ce298e397ea8fc452302f8a',
    //             },
    //             {
    //                 id: '2',
    //                 name: 'beng-beng',
    //                 url: 'https://img.ws.mms.shopee.co.id/db572b217ce298e397ea8fc452302f8a',
    //             },
    //             {
    //                 id: '3',
    //                 name: 'beng-beng',
    //                 url: 'https://img.ws.mms.shopee.co.id/db572b217ce298e397ea8fc452302f8a',
    //             },
    //             {
    //                 id: '4',
    //                 name: 'beng-beng',
    //                 url: 'https://img.ws.mms.shopee.co.id/db572b217ce298e397ea8fc452302f8a',
    //             },
    //             {
    //                 id: '5',
    //                 name: 'beng-beng',
    //                 url: 'https://img.ws.mms.shopee.co.id/db572b217ce298e397ea8fc452302f8a',
    //             },
    //             {
    //                 id: '6',
    //                 name: 'beng-beng',
    //                 url: 'https://img.ws.mms.shopee.co.id/db572b217ce298e397ea8fc452302f8a',
    //             },
    //         ],
    //     },
    //     {
    //         id: '2',
    //         name: 'Detol Sabun Mandi Cair Cool 370 g',
    //         vendorName: 'ZZZ Store',
    //         price: 32900,
    //         stock: 10,
    //         description:
    //             'Sabun Mandi Cair Dettol Cool merupakan sabun cair anti bakteri untuk memberikan perlindungan keluarga anda setiap harinya dari kuman penyebab timbulnya bau badan serta memberikan sensasi mentol yang menyegarkan.',
    //         images: [
    //             {
    //                 id: '1',
    //                 name: 'detol-cool-370g',
    //                 url: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/catalog-image/MTA-16726020/dettol_dettol_sabun_mandi_cair_cool_370_g_full02_p0k26hsn.jpeg',
    //             },
    //             {
    //                 id: '2',
    //                 name: 'detol-cool-370g',
    //                 url: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/catalog-image/MTA-16726020/dettol_dettol_sabun_mandi_cair_cool_370_g_full02_p0k26hsn.jpeg',
    //             },
    //             {
    //                 id: '3',
    //                 name: 'detol-cool-370g',
    //                 url: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/catalog-image/MTA-16726020/dettol_dettol_sabun_mandi_cair_cool_370_g_full02_p0k26hsn.jpeg',
    //             },
    //             {
    //                 id: '4',
    //                 name: 'detol-cool-370g',
    //                 url: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/catalog-image/MTA-16726020/dettol_dettol_sabun_mandi_cair_cool_370_g_full02_p0k26hsn.jpeg',
    //             },
    //             {
    //                 id: '5',
    //                 name: 'detol-cool-370g',
    //                 url: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/catalog-image/MTA-16726020/dettol_dettol_sabun_mandi_cair_cool_370_g_full02_p0k26hsn.jpeg',
    //             },
    //             {
    //                 id: '6',
    //                 name: 'detol-cool-370g',
    //                 url: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/catalog-image/MTA-16726020/dettol_dettol_sabun_mandi_cair_cool_370_g_full02_p0k26hsn.jpeg',
    //             },
    //         ],
    //     },
    //     {
    //         id: '3',
    //         name: "Wall's Cornetto Es Krim Kopi Karamel 80 ml",
    //         vendorName: 'ABC Store',
    //         price: 6300,
    //         stock: 15,
    //         description:
    //             'Es Susu Rasa Kopi dan Karamel dengan saus Cokelat dan Butiran Cokelat. Cara Penyimpanan : Simpan pada suhu beku di bawah -18C.',
    //         images: [
    //             {
    //                 id: '1',
    //                 name: 'walls-cornetto',
    //                 url: 'https://assets.klikindomaret.com/products/20128054/20128054_1.jpg',
    //             },
    //             {
    //                 id: '2',
    //                 name: 'walls-cornetto',
    //                 url: 'https://assets.klikindomaret.com/products/20128054/20128054_1.jpg',
    //             },
    //             {
    //                 id: '3',
    //                 name: 'walls-cornetto',
    //                 url: 'https://assets.klikindomaret.com/products/20128054/20128054_1.jpg',
    //             },
    //             {
    //                 id: '4',
    //                 name: 'walls-cornetto',
    //                 url: 'https://assets.klikindomaret.com/products/20128054/20128054_1.jpg',
    //             },
    //             {
    //                 id: '5',
    //                 name: 'walls-cornetto',
    //                 url: 'https://assets.klikindomaret.com/products/20128054/20128054_1.jpg',
    //             },
    //             {
    //                 id: '6',
    //                 name: 'walls-cornetto',
    //                 url: 'https://assets.klikindomaret.com/products/20128054/20128054_1.jpg',
    //             },
    //         ],
    //     },
    //     {
    //         id: '4',
    //         name: 'Pringles Potato Crisps Original 102 g',
    //         vendorName: 'Alfa Store',
    //         price: 27300,
    //         stock: 20,
    //         description:
    //             'Pringles Potato Crisps Original adalah salah satu varian keripik kentang Pringles. Dengan teksturnya yang tebal dan berbentuk pelana, keripik kentang ini disusun dalam sebuah tabung berlapis alumunium foil yang tertutup rapat sehingga terjaga kerenyahan dan keutuhannya. Anda akan merasakan kelezatan yang tebal dan utuh dalam setiap tabungnya. Rasa gurih asinnya yang istimewa akan menjadikan keripik kentang ini menjadi makanan ringat favorit Anda karena bumbunya yang unik dan merata ke seluruh keripik kentang yang ada dalam tabungnya. Rasakan serunya banyak hal dalam hidup Anda bersama kerenyahan asli kentang dari Pringles Potato Crisps Original',
    //         images: [
    //             {
    //                 id: '1',
    //                 name: 'Pringles-potato-crisp-ori',
    //                 url: 'https://images.tokopedia.net/img/cache/700/VqbcmM/2023/9/8/c59a2f32-941f-4c33-9f29-fd238394e6a3.png',
    //             },
    //             {
    //                 id: '2',
    //                 name: 'Pringles-potato-crisp-ori',
    //                 url: 'https://images.tokopedia.net/img/cache/700/VqbcmM/2023/9/8/c59a2f32-941f-4c33-9f29-fd238394e6a3.png',
    //             },
    //             {
    //                 id: '3',
    //                 name: 'Pringles-potato-crisp-ori',
    //                 url: 'https://images.tokopedia.net/img/cache/700/VqbcmM/2023/9/8/c59a2f32-941f-4c33-9f29-fd238394e6a3.png',
    //             },
    //             {
    //                 id: '4',
    //                 name: 'Pringles-potato-crisp-ori',
    //                 url: 'https://images.tokopedia.net/img/cache/700/VqbcmM/2023/9/8/c59a2f32-941f-4c33-9f29-fd238394e6a3.png',
    //             },
    //             {
    //                 id: '5',
    //                 name: 'Pringles-potato-crisp-ori',
    //                 url: 'https://images.tokopedia.net/img/cache/700/VqbcmM/2023/9/8/c59a2f32-941f-4c33-9f29-fd238394e6a3.png',
    //             },
    //             {
    //                 id: '6',
    //                 name: 'Pringles-potato-crisp-ori',
    //                 url: 'https://images.tokopedia.net/img/cache/700/VqbcmM/2023/9/8/c59a2f32-941f-4c33-9f29-fd238394e6a3.png',
    //             },
    //             {
    //                 id: '7',
    //                 name: 'Pringles-potato-crisp-ori',
    //                 url: 'https://images.tokopedia.net/img/cache/700/VqbcmM/2023/9/8/c59a2f32-941f-4c33-9f29-fd238394e6a3.png',
    //             },
    //         ],
    //     },
    //     {
    //         id: '5',
    //         name: "Wall's Cornetto Es Krim Kopi Karamel 80 ml",
    //         vendorName: 'ABC Store',
    //         price: 6300,
    //         stock: 15,
    //         description:
    //             'Es Susu Rasa Kopi dan Karamel dengan saus Cokelat dan Butiran Cokelat. Cara Penyimpanan : Simpan pada suhu beku di bawah -18C.',
    //         images: [
    //             {
    //                 id: '1',
    //                 name: 'walls-cornetto',
    //                 url: 'https://assets.klikindomaret.com/products/20128054/20128054_1.jpg',
    //             },
    //             {
    //                 id: '2',
    //                 name: 'walls-cornetto',
    //                 url: 'https://assets.klikindomaret.com/products/20128054/20128054_1.jpg',
    //             },
    //             {
    //                 id: '3',
    //                 name: 'walls-cornetto',
    //                 url: 'https://assets.klikindomaret.com/products/20128054/20128054_1.jpg',
    //             },
    //             {
    //                 id: '4',
    //                 name: 'walls-cornetto',
    //                 url: 'https://assets.klikindomaret.com/products/20128054/20128054_1.jpg',
    //             },
    //             {
    //                 id: '5',
    //                 name: 'walls-cornetto',
    //                 url: 'https://assets.klikindomaret.com/products/20128054/20128054_1.jpg',
    //             },
    //             {
    //                 id: '6',
    //                 name: 'walls-cornetto',
    //                 url: 'https://assets.klikindomaret.com/products/20128054/20128054_1.jpg',
    //             },
    //         ],
    //     },
    //     {
    //         id: '6',
    //         name: 'Pringles Potato Crisps Original 102 g',
    //         vendorName: 'Alfa Store',
    //         price: 27300,
    //         stock: 20,
    //         description:
    //             'Pringles Potato Crisps Original adalah salah satu varian keripik kentang Pringles. Dengan teksturnya yang tebal dan berbentuk pelana, keripik kentang ini disusun dalam sebuah tabung berlapis alumunium foil yang tertutup rapat sehingga terjaga kerenyahan dan keutuhannya. Anda akan merasakan kelezatan yang tebal dan utuh dalam setiap tabungnya. Rasa gurih asinnya yang istimewa akan menjadikan keripik kentang ini menjadi makanan ringat favorit Anda karena bumbunya yang unik dan merata ke seluruh keripik kentang yang ada dalam tabungnya. Rasakan serunya banyak hal dalam hidup Anda bersama kerenyahan asli kentang dari Pringles Potato Crisps Original',
    //         images: [
    //             {
    //                 id: '1',
    //                 name: 'Pringles-potato-crisp-ori',
    //                 url: 'https://images.tokopedia.net/img/cache/700/VqbcmM/2023/9/8/c59a2f32-941f-4c33-9f29-fd238394e6a3.png',
    //             },
    //             {
    //                 id: '2',
    //                 name: 'Pringles-potato-crisp-ori',
    //                 url: 'https://images.tokopedia.net/img/cache/700/VqbcmM/2023/9/8/c59a2f32-941f-4c33-9f29-fd238394e6a3.png',
    //             },
    //             {
    //                 id: '3',
    //                 name: 'Pringles-potato-crisp-ori',
    //                 url: 'https://images.tokopedia.net/img/cache/700/VqbcmM/2023/9/8/c59a2f32-941f-4c33-9f29-fd238394e6a3.png',
    //             },
    //             {
    //                 id: '4',
    //                 name: 'Pringles-potato-crisp-ori',
    //                 url: 'https://images.tokopedia.net/img/cache/700/VqbcmM/2023/9/8/c59a2f32-941f-4c33-9f29-fd238394e6a3.png',
    //             },
    //             {
    //                 id: '5',
    //                 name: 'Pringles-potato-crisp-ori',
    //                 url: 'https://images.tokopedia.net/img/cache/700/VqbcmM/2023/9/8/c59a2f32-941f-4c33-9f29-fd238394e6a3.png',
    //             },
    //             {
    //                 id: '6',
    //                 name: 'Pringles-potato-crisp-ori',
    //                 url: 'https://images.tokopedia.net/img/cache/700/VqbcmM/2023/9/8/c59a2f32-941f-4c33-9f29-fd238394e6a3.png',
    //             },
    //         ],
    //     },
    // ]);
    // const styles = useMemo(() =>
    //     StyleSheet.create({
    //         container: {
    //             flex: 1,
    //             backgroundColor: theme.colors.background,
    //             padding: 15,
    //         },
    //         cardContainer: {
    //             marginBottom: 10,
    //             width: '48%',
    //         },
    //         prdImage: {
    //             width: '100%',
    //             height: 200,
    //             objectFit: 'cover',
    //             borderRadius: 10,
    //             borderWidth: 1,
    //             borderColor: theme.colors.grey,
    //             overflow: 'hidden',
    //         },
    //         favButton: {
    //             position: 'absolute',
    //             top: 10,
    //             right: 10,
    //             backgroundColor: theme.colors.primary,
    //             elevation: 5,
    //             paddingHorizontal: 5,
    //             paddingVertical: 5,
    //             borderRadius: 50,
    //         },
    //         prdName: {
    //             fontFamily: 'poppins-regular',
    //             fontSize: 14,
    //         },
    //         prdPrice: {
    //             fontFamily: 'poppins-semibold',
    //             fontSize: 16,
    //         },
    //         vendorNameContainer: {
    //             flexDirection: 'row',
    //         },
    //         vendorName: {
    //             marginLeft: 5,
    //             fontFamily: 'poppins-regular',
    //             fontSize: 14,
    //         },
    //     })
    // );
    // const onRefresh = useCallback(() => {
    //     setRefreshing(true);
    //     setTimeout(() => {
    //         setRefreshing(false);
    //     }, 2000);
    // }, []);
    // const { width, height } = Dimensions.get('window');
    // return (
    //     <View style={styles.container}>
    //         <View style={{ paddingVertical: 10 }}>
    //             <CustomTextInput
    //                 preIcon={
    //                     <Ionicons
    //                         name="search-outline"
    //                         size={16}
    //                         style={{ marginHorizontal: 8 }}
    //                     />
    //                 }
    //             />
    //         </View>
    //         <View>
    //             <FlatList
    //                 showsVerticalScrollIndicator={false}
    //                 contentContainerStyle={{ paddingBottom: 70 }}
    //                 columnWrapperStyle={{ justifyContent: 'space-between' }}
    //                 refreshControl={
    //                     <RefreshControl
    //                         refreshing={refreshing}
    //                         onRefresh={onRefresh}
    //                     />
    //                 }
    //                 numColumns={2}
    //                 data={dummyData}
    //                 keyExtractor={(item) => item.id}
    //                 renderItem={({ item }) => {
    //                     return (
    //                         <TouchableOpacity
    //                             onPress={() =>
    //                                 navigation.navigate('ProductDetail', item)
    //                             }
    //                             style={styles.cardContainer}
    //                         >
    //                             <View>
    //                                 <ImageBackground
    //                                     source={{ uri: item.images[0].url }}
    //                                     alt={item.images[0].name}
    //                                     style={styles.prdImage}
    //                                 >
    //                                     <TouchableOpacity
    //                                         style={styles.favButton}
    //                                     >
    //                                         <Ionicons
    //                                             name="heart-outline"
    //                                             size={24}
    //                                             color={theme.colors.grey}
    //                                         />
    //                                     </TouchableOpacity>
    //                                 </ImageBackground>
    //                             </View>
    //                             <View>
    //                                 <Text
    //                                     numberOfLines={1}
    //                                     style={styles.prdName}
    //                                 >
    //                                     {item.name}
    //                                 </Text>
    //                                 <Text style={styles.prdPrice}>
    //                                     {currencyFormat(item.price)}
    //                                 </Text>
    //                                 <View style={styles.vendorNameContainer}>
    //                                     <Ionicons
    //                                         name="storefront"
    //                                         size={16}
    //                                         color={theme.colors.primary}
    //                                     />
    //                                     <Text style={styles.vendorName}>
    //                                         {item.vendorName}
    //                                     </Text>
    //                                 </View>
    //                             </View>
    //                         </TouchableOpacity>
    //                     );
    //                 }}
    //             />
    //         </View>
    //     </View>
    // );
    // const [products, setProducts] = useState([]);
    // const [search, setSearch] = useState('');
    // const [page, setPage] = useState(1);
    // const [size, setSize] = useState(8);
    // const [loading, setLoading] = useState(true);
    // const [refreshing, setRefreshing] = useState(false);
    // const [hasNextPage, setHasNextPage] = useState(true);
    // const fetchProducts = async () => {
    //     try {
    //         setLoading(true);
    //         const response = await apiClient({
    //             url: '/api/product',
    //             method: 'get',
    //             params: {
    //                 q: search,
    //                 page: page,
    //                 size: size,
    //             },
    //         });
    //         setProducts(response.data.data);
    //         setHasNextPage(response.data.paging.hasNext);
    //         setLoading(false);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };
    // const handleRefresh = () => {
    //     setRefreshing(true);
    //     setPage(1);
    //     fetchProducts().then(() => setRefreshing(false));
    // };
    // const handleLoadMore = () => {
    //     if (!hasNextPage) return;
    //     setPage(page + 1);
    //     fetchProducts();
    // };
    // useEffect(() => {
    //     fetchProducts();
    // }, [page]);
    // if (loading) {
    //     return <ActivityIndicator size="large" />;
    // }
    // return (
    //     <View style={{ marginBottom: 40 }}>
    //         <TextInput
    //             placeholder="Search..."
    //             value={search}
    //             onChangeText={setSearch}
    //             onSubmitEditing={handleRefresh} // Trigger refresh when user submits search query
    //             style={{ marginBottom: 10, padding: 10, borderWidth: 1 }}
    //         />
    //         <FlatList
    //             data={products}
    //             keyExtractor={(item) => item.id}
    //             renderItem={({ item }) => (
    //                 <View
    //                     style={{
    //                         marginBottom: 10,
    //                         padding: 10,
    //                         borderWidth: 1,
    //                     }}
    //                 >
    //                     <Text>{item.name}</Text>
    //                     <Text>{item.priceAmount}</Text>
    //                 </View>
    //             )}
    //             refreshing={refreshing}
    //             onRefresh={handleRefresh}
    //             ListFooterComponent={
    //                 hasNextPage ? <ActivityIndicator size="large" /> : null
    //             }
    //             onEndReached={handleLoadMore}
    //             onEndReachedThreshold={0.5}
    //         />
    //     </View>
    // );

    const { theme } = useTheme();
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(8);
    const productService = useMemo(() => ProductService(), []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            // console.log('PAGE SEBELUM LOAD ' + page);
            const data = await productService.getAll({
                q: search,
                page: page,
                size: size,
            });
            setProducts(data.data);
            if (data.paging.hasNext) {
                setPage(page + 1);
            }
            setHasNextPage(data.paging.hasNext);
            setLoading(false);
        } catch (err) {
            Alert.alert('Error', err.data.message);
        }
    };

    const loadMore = async () => {
        // console.log('PAGE SAAAT LOAD MORE' + page);
        if (loading) return;
        // console.log(hasNextPage)

        try {
            if (hasNextPage) {
                setPage(page + 1);

                setLoading(true);

                const data = await productService.getAll({
                    q: search,
                    page: page,
                    size: size,
                });

                // console.log('DATA PADA LOAD MORE' + data);

                const newProducts = data.data.filter(
                    (product) => !products.some((p) => p.id === product.id)
                );

                setProducts((existingProducts) => {
                    return [...existingProducts, ...newProducts];
                });
                setHasNextPage(data.paging.hasNext);
            }
            setLoading(false);
        } catch (err) {
            Alert.alert('Error', err.data.message);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

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
                overflow: 'hidden',
            },
            favButton: {
                position: 'absolute',
                top: 10,
                right: 10,
                backgroundColor: theme.colors.primary,
                elevation: 5,
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

    const { width, height } = Dimensions.get('window');

    return (
        <View style={styles.container}>
            <View style={{ paddingVertical: 10 }}>
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
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 70 }}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    // refreshControl={
                    //     <RefreshControl
                    //         refreshing={refreshing}
                    //         onRefresh={onRefresh}
                    //     />
                    // }
                    numColumns={2}
                    data={products}
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
                                        source={{
                                            uri:
                                                'http://10.10.102.39:8080' +
                                                item.thumbnail.url,
                                        }}
                                        alt={item.thumbnail.name}
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
                                    <Text
                                        numberOfLines={1}
                                        style={styles.prdName}
                                    >
                                        {item.name}
                                    </Text>
                                    <Text style={styles.prdPrice}>
                                        {currencyFormat(item.priceAmount)}
                                    </Text>
                                </View>
                                {/* <View style={styles.vendorNameContainer}>
                                    <Ionicons
                                        name="storefront"
                                        size={16}
                                        color={theme.colors.primary}
                                    />
                                    <Text style={styles.vendorName}>
                                        {item.vendorName}
                                    </Text>
                                </View> */}
                            </TouchableOpacity>
                        );
                    }}
                    onEndReached={loadMore}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={() =>
                        loading && (
                            <ActivityIndicator
                                size="large"
                                style={{ marginBottom: 20 }}
                            />
                        )
                    }
                />
            </View>
        </View>
    );
};
