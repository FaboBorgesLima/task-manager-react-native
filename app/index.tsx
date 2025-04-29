import Card from "@/components/Card";
import MainCard from "@/components/card/MainCard";
import PlayerCard, { PlayerCardProps } from "@/components/card/PlayerCard";
import Title from "@/components/Title";
import { Link, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native";

export default function () {
    const [players, setPlayers] = useState<PlayerCardProps[]>([
        {
            name: "name",
            nickname: "nickname",
            imgUrl: "https://cdn-icons-png.flaticon.com/512/2603/2603009.png",
            hp: 100,
            hpMax: 100,
            mana: 100,
            manaMax: 150,
            level: 1,
            role: "leader",
            playerClassIcon: "sword",
        },
        {
            name: "name",
            nickname: "nickname",
            imgUrl: "https://cdn-icons-png.flaticon.com/512/2603/2603009.png",
            hp: 100,
            hpMax: 100,
            mana: 100,
            manaMax: 150,
            level: 1,
            role: "leader",
            playerClassIcon: "sword",
        },
        {
            name: "name",
            nickname: "nickname",
            imgUrl: "https://cdn-icons-png.flaticon.com/512/2603/2603009.png",
            hp: 100,
            hpMax: 150,
            mana: 100,
            manaMax: 100,
            level: 1,
            role: "Warrior",
            playerClassIcon: "shield",
        },
        {
            name: "name",
            nickname: "nickname",
            imgUrl: "https://cdn-icons-png.flaticon.com/512/2603/2603009.png",
            hp: 100,
            hpMax: 200,
            mana: 100,
            manaMax: 100,
            level: 2,
            role: "Warrior",
            playerClassIcon: "axe",
        },
        {
            name: "name",
            nickname: "nickname",
            imgUrl: "https://cdn-icons-png.flaticon.com/512/2603/2603009.png",
            hp: 100,
            hpMax: 200,
            mana: 100,
            manaMax: 100,
            level: 1,
            role: "Warrior",
            playerClassIcon: "axe",
        },
    ]);

    useEffect(() => {
        players.forEach((player) => {
            player.mana = Math.floor(Math.random() * player.manaMax);
            player.hp = Math.floor(Math.random() * player.hpMax);
        });

        setPlayers([...players]);
    }, []);

    return (
        <ScrollView style={styles.scrollView}>
            <MainCard
                hp={100}
                damageDone={10}
                name="name"
                imgUrl={
                    "https://cdn-icons-png.flaticon.com/512/2603/2603009.png"
                }
                participating={10}
                title="test"
            ></MainCard>
            <Title>MEMBERS</Title>

            <View style={styles.playersContainer}>
                {players.map((player) => (
                    <PlayerCard key={Math.random()} {...player}></PlayerCard>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    playersContainer: {
        display: "flex",
        gap: 16,
        padding: 8,
    },
    scrollView: {
        backgroundColor: "#fff",
    },
});
