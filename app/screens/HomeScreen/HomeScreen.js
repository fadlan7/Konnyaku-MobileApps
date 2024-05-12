import React, { useEffect, useMemo, useState } from 'react';
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
import { ActivityIndicator } from 'react-native';
import ProductService from '../../services/konnyakuApi/ProductService';

export const HomeScreen = ({ navigation }) => {
    const { theme } = useTheme();
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(8);
    const productService = useMemo(() => ProductService(), []);

    const onRefresh = () => {
        setProducts([]);
        setPage(1);
        setSize(8);
        setHasNextPage(false);

        fetchProducts();
    };

    const fetchProducts = async () => {
        try {
            console.log(page);
            setLoading(true);
            const data = await productService.getAll({
                q: search,
                page: page,
                size: size,
            });
            setProducts(data.data);
            setHasNextPage(data.paging.hasNext);
            setLoading(false);
        } catch (err) {
            Alert.alert('Error', err.data.message);
        }
    };

    const loadMore = async () => {
        if (hasNextPage) {
            setLoading(true);
            console.log('load more dipanggil');
            // setPage(page + 1);

            const data = await productService.getAll({
                q: search,
                page: page,
                size: size,
            });

            const newProducts = data.data.filter(
                (product) => !products.some((p) => p.id === product.id)
            );

            setProducts((existingProducts) => {
                return [...existingProducts, ...newProducts];
            });

            if (data.paging.hasNext === true) {
                setPage(page + 1);
            }
            setHasNextPage(data.paging.hasNext);
            setLoading(false);
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
                    value={search}
                    onChangeText={setSearch}
                    onSubmitEditing={onRefresh}
                />
            </View>
            <View>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 70 }}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    refreshing={loading}
                    onRefresh={onRefresh}
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
                    onEndReachedThreshold={0}
                    onEndReached={loadMore}
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
