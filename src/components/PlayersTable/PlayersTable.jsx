import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectPlayers } from '../../model/playersSlice.js';
import {
    selectIsPlaying,
    selectGameCycle,
    selectCurrentTimeOfDay
 } from '../../model/gameSlice.js';
import {
    kill, kick, setName, editName,
    editRole, setRole, setFine, expose
} from '../../model/playersSlice.js';
import { play, setNextTime } from '../../model/gameSlice.js';
import { Input, Select, Checkbox, Table, Button, Space, Typography } from 'antd';
import { PlayerIcon } from '../Icons/Icons';
import './PlayersTable.scss';

const { Text } = Typography;
const { Option } = Select;
const playersRole = ['Мирный житель', 'Мирная жительница', 'Мафия', 'Дон', 'Шериф'];

export const PlayersTable = () => {
    // selectors
    const players = useSelector(selectPlayers);
    const isPlaying = useSelector(selectIsPlaying);
    const gameCycle = useSelector(selectGameCycle);
    const currentTimeOfDay = useSelector(selectCurrentTimeOfDay);
    // getting dispatch
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(players)
    }, [players]);

    const handleKeyPress = (e, name, id) => {
        if (e.key === 'Enter' && name) dispatch(editName(id));
    }

    const columns = [
        {
            title: '№',
            dataIndex: 'id',
        },
        {
            title: 'Игрок',
            dataIndex: 'name',
            render: (_, { id, name, isEditingName, killed, kicked }) => (
                isEditingName ? (
                    <Input
                        onChange={e => dispatch(setName({id, name: e.target.value}))}
                        value={name}
                        placeholder="Напишите имя игрока"
                        onBlur={() => name ? dispatch(editName(id)) : null}
                        onKeyPress={(e) => handleKeyPress(e, name, id)}
                    />
                ) : (
                    <>
                        <Text 
                            type={killed || kicked ? 'danger' : null}
                            delete={killed || kicked}
                            onDoubleClick={() => dispatch(editName(id))}
                        >
                            {name}
                        </Text>
                    </>
                )
            ),
        },
        {
            title: 'Роль',
            dataIndex: 'role',
            render: (_, { id, isEditingRole, killed, kicked, role }) => (
                isEditingRole ? (
                    <Select 
                        {...(role ? {defaultValue: role} : null)}
                        onBlur={() => role ? dispatch(editRole(id)) : null}
                        style={{ width: 200 }}
                        onChange={(role) => dispatch(setRole({id, role}))}
                        placeholder="Выберете роль игрока"
                    >
                        {playersRole.map((role, i) => <Option key={i} value={role}>{role}</Option>)}
                    </Select>
                ) : (
                    <Space style={{display: 'flex', alignItems: 'center'}}>
                        {role && <PlayerIcon role={role} />}
                        <Text 
                            type={killed || kicked ? 'danger' : null}
                            delete={killed || kicked}
                            onDoubleClick={() =>
                            dispatch(editRole(id))}
                        >
                            {role}
                        </Text>
                    </Space>
                )
                
            )
        },
        {
            title: 'Замечания',
            dataIndex: 'fines',
            render: (_, { fines, id }) => (
                Object.keys(fines).map(fine => (
                    <Checkbox
                        key={fine}
                        onChange={() => dispatch(setFine({id, fine}))}
                        checked={fines[fine]}
                        disabled={!isPlaying}
                    />
                ))
            )
        },
        {
            title: 'Выставлен на голосование',
            dataIndex: 'exposed',
            render: (_, { exposed, id }) => (
                <Checkbox
                    key={exposed}
                    onChange={() => dispatch(expose(id))}
                    checked={exposed}
                    disabled={!isPlaying}
                />
            )
        },
        ...gameCycle.map(({key, title}) => ({
            title: title,
            dataIndex: key,
            render: (_, { lifeCycle }) => <Text>{lifeCycle[key]}</Text>
        })),
        {
            title: 'Действия',
            dataIndex: 'actions',
            render: (_, { id, killed, kicked }) => (
                <Space size="small">
                    <Button
                        type="default"
                        danger={!killed}
                        onClick={() => dispatch(kill({id, lifeCycleKey: gameCycle[currentTimeOfDay].key}))}
                        disabled={kicked || !isPlaying}
                    >
                        {killed ? 'Возрадить' : 'Убить'}
                    </Button>
                    <Button
                        type="default"
                        danger={!kicked}
                        onClick={() => dispatch(kick({id, lifeCycleKey: gameCycle[currentTimeOfDay].key}))}
                        disabled={killed || !isPlaying}
                    >
                        {kicked ? 'Освободить' : 'Посадить'}
                    </Button>
                </Space>
            )
        },
    ];

    return (
        <>
            <Text style={{paddingBottom: '10px', display: 'block'}}>Количество игроков: {players.filter(({killed, kicked}) => !killed && !kicked).length}</Text>
            <nav>
                <Button disabled={isPlaying} type="primary" onClick={() => dispatch(play())}>
                    Начать игру
                </Button>
                <Text style={{ fontSize: '32px' }}>
                   { currentTimeOfDay !== null ? 'Сейчас ' + gameCycle[currentTimeOfDay].fullTitle.toLowerCase() : 'Игра не началась'}
                </Text>
                <Space size="small">
                    <Button
                        type="primary"
                        disabled={!isPlaying || currentTimeOfDay === 0}
                        onClick={() => {dispatch(setNextTime('return'))}}
                    >
                        Вернуться
                    </Button>
                    <Button
                        type="primary"
                        disabled={!isPlaying || currentTimeOfDay === 7 || gameCycle[currentTimeOfDay].key[1] === 'd'}
                        onClick={() => {dispatch(setNextTime())}}
                    >
                        День
                    </Button>
                    <Button
                        type="primary"
                        disabled={!isPlaying || currentTimeOfDay === 7 || gameCycle[currentTimeOfDay].key[1] === 'n'}
                        onClick={() => {dispatch(setNextTime())}}
                    >
                        Ночь
                    </Button>
                </Space> 
            </nav>
            <Table dataSource={players} columns={columns} pagination={false} />
        </>
    );
}