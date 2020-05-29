import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectPlayers
} from '../../model/playersSlice.js';
import {
    selectIsPlaying
} from '../../model/gameSlice.js';
import {
    // kill,
    // kick,
    setName,
    editName,
    setRole,
    setFine
} from '../../model/playersSlice.js';
import { Input, Select, Checkbox, Table } from 'antd';

import './PlayersTable.scss';

export const PlayersTable = () => {
    const players = useSelector(selectPlayers);
    const isPlaying = useSelector(selectIsPlaying);

    const dispatch = useDispatch();

    const { Option } = Select;

    const checkboxLabel = {
        first: 'Первое',
        second: 'Второе',
        third: 'Третье'
    }
    const playersRole = ['Мирный житель', 'Мафия', 'Дон', 'Шериф'];

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
            key: 'id',
        },
        {
            title: 'Игрок',
            dataIndex: 'name',
            key: 'name',
            render: (_, { id, name, isEditingName }) => (
                isEditingName ? (
                    <Input
                        onInput={e => dispatch(setName({id, name: e.target.value}))}
                        value={name}
                        placeholder="Напишите имя игрока"
                        onBlur={() => name ? dispatch(editName(id)) : null}
                        onKeyPress={handleKeyPress}
                    />
                ) : (<span onDoubleClick={() => dispatch(editName(id))}>{name}</span>)
            ),
        },
        {
            title: 'Роль',
            dataIndex: 'role',
            key: 'role',
            render: (_, { id }) => (
                <Select
                    style={{ width: 200 }}
                    onChange={(role) => dispatch(setRole({id, role}))}
                    placeholder="Выберете роль игрока"
                >
                    {playersRole.map((role, i) => <Option key={i} value={role}>{role}</Option>)}
                </Select>
            )
        },
        {
            title: 'Замечания',
            dataIndex: 'fines',
            key: 'fines',
            render: (_, { fines, id }) => (
                Object.keys(fines).map(fine => (
                    <Checkbox
                        key={fine}
                        onChange={() => dispatch(setFine({id, fine}))}
                        checked={fines[fine]}
                        disabled={!isPlaying}
                    >
                        {checkboxLabel[fine]}
                    </Checkbox>
                ))
            )
        }
    ];

    return <Table dataSource={players} columns={columns} pagination={false} />;
}