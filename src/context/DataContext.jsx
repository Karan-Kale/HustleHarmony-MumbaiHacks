import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from './AuthContext';

const DataContext = createContext({});

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    const { user } = useAuth();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            setTransactions([]);
            setLoading(false);
            return;
        }

        const fetchTransactions = async () => {
            try {
                const { data, error } = await supabase
                    .from('transactions')
                    .select('*')
                    .order('date', { ascending: false });

                if (error) throw error;
                setTransactions(data || []);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, [user]);

    const addTransaction = async (transaction) => {
        if (!user) return;

        const { data, error } = await supabase
            .from('transactions')
            .insert([{ ...transaction, user_id: user.id }])
            .select()
            .single();

        if (error) throw error;
        setTransactions([data, ...transactions]);
        return data;
    };

    const updateTransaction = async (id, updates) => {
        if (!user) return;

        const { data, error } = await supabase
            .from('transactions')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        setTransactions(transactions.map(t => t.id === id ? data : t));
        return data;
    };

    const deleteTransaction = async (id) => {
        if (!user) return;

        const { error } = await supabase
            .from('transactions')
            .delete()
            .eq('id', id);

        if (error) throw error;
        setTransactions(transactions.filter(t => t.id !== id));
    };

    const value = {
        transactions,
        loading,
        addTransaction,
        updateTransaction,
        deleteTransaction,
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};
