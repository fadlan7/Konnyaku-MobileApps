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
import ListItem from './components/ListItem';

export const HomeScreen = ({ navigation }) => {
    const { width, height } = Dimensions.get('window');
    const initialPage = 1;
    const initialSize = 8;
    const { theme } = useTheme();
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(initialPage);
    const [size, setSize] = useState(initialSize);
    const productService = useMemo(() => ProductService(), []);

    const handleOnRefresh = () => {
        setProducts([]);
        setPage(1);
        setSize(8);
        setHasNextPage(false);

        fetchProducts();
    };

    const fetchProducts = async () => {
        try {
            setPage(1);
            setLoading(true);
            const data = await productService.getAll({
                q: search,
                page: 1,
                size: size,
            });

            const newProducts = data.data.filter(
                (product) => product.status !== 'REMOVED'
            );

            setProducts(newProducts);
            setHasNextPage(data.paging.hasNext);
            setLoading(false);
        } catch (err) {
            Alert.alert('Error', err.data.message);
        }
    };

    const handleLoadMore = async () => {
        if (hasNextPage) {
            setLoading(true);
            setPage(page + 1);

            const data = await productService.getAll({
                q: search,
                page: page,
                size: size,
            });

            const newProducts = data.data.filter(
                (product) =>
                    !products.some((p) => p.id === product.id) &&
                    product.status !== 'REMOVED'
            );

            setProducts((existingProducts) => {
                return [...existingProducts, ...newProducts];
            });

            // if (data.paging.hasNext === true) {
            //     setPage(page + 1);
            // }
            setHasNextPage(data.paging.hasNext);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
        return () => {};
    }, []);

    const styles = useMemo(() =>
        StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: theme.colors.background,
                padding: 15,
            },
        })
    );

    const renderItem = ({ item }) => <ListItem item={item} />;

    return (
        <View style={styles.container}>
            <View></View>
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
                    onSubmitEditing={handleOnRefresh}
                />
            </View>
            <View>
                <FlatList
                    ListEmptyComponent={
                        products.length == 0 && (
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: height - 50,
                                }}
                            >
                                <Image
                                    style={{
                                        width: width,
                                        height: width,
                                    }}
                                    source={require('../../shared/assets/images/login.png')}
                                    resizeMode="contain"
                                />
                                <Text
                                    style={{ fontFamily: 'poppins-semibold' }}
                                >
                                    Doesn't have a product
                                </Text>
                            </View>
                        )
                    }
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 70 }}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    refreshing={loading}
                    onRefresh={handleOnRefresh}
                    numColumns={2}
                    data={products}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    onEndReachedThreshold={0}
                    onEndReached={handleLoadMore}
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
