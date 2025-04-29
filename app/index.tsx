import Card from "@/components/Card";
import MainCard from "@/components/card/MainCard";
import PlayerCard, { PlayerCardProps } from "@/components/card/PlayerCard";
import Title from "@/components/Title";
import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";
import { ScrollView } from "react-native";

export default function () {
    const players: PlayerCardProps[] = [
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
    ];
    return (
        <ScrollView>
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

            {players.map((player) => (
                <PlayerCard {...player}></PlayerCard>
            ))}
        </ScrollView>
    );
}
