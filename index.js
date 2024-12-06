// const axios = require('axios');
// const fs = require('fs');
import axios from 'axios';
import fs from 'fs';
import { process as descendantProcess } from './descendant.js';

const baseUrl = 'https://open.api.nexon.com/static/tfd/meta';
const apiKey = 'test_645470676a3bbb55286e489eef40ae9ecc9cc84a179a54abf948923c76d9d94cefe8d04e6d233bd35cf2fabdeb93fb0d';
const jsonList = [
    '/ko/descendant.json',
    '/ko/weapon.json',
    '/ko/module.json',
    '/ko/reactor.json',
    '/ko/external-component.json',
    '/ko/reward.json',
    '/ko/stat.json',
    '/ko/void-battle.json',
    '/ko/title.json',
    '/descendant-level-detail.json',
    '/mastery-rank-level-detail.json',
    '/ko/consumable-material.json',
    '/ko/research.json',
    '/amorphous-reward.json',
    '/amorphous-reward-group.json',
    '/ko/amorphous-open-condition-description.json',
    '/ko/acquisition-detail.json',
    '/ko/weapon-type.json',
    '/ko/fellow.json',
    '/fellow-level-detail.json',
    '/ko/tier.json'
];

function Request(jsonName) {
    return axios.get(`${baseUrl}${jsonName}`, {
        headers: {
            'x-nxopen-api-key': apiKey
        },
        maxBodyLength: Infinity
    });
}

function main() {
    const folderName = 'dist';

    // 폴더 없는 경우 폴더 생성
    if (!fs.existsSync(folderName)) {
        fs.mkdirSync(folderName, {
            recursive: true
        });
    }

    const jobList = [];
    for (const j of jsonList) {
        jobList.push(Request(j));
    }

    Promise.all(jobList)
        .then((values) => {
            for (const value of values) {
                const names = value.request.path.split('/');
                const fileName = names[names.length - 1];
                const json = JSON.stringify(value.data);
                if (fileName === 'descendant.json') {
                    const details = descendantProcess(value.data);
                    fs.writeFileSync(`${folderName}/descendant-detail.json`, JSON.stringify(details), 'utf-8');
                }
                fs.writeFileSync(`${folderName}/${fileName}`, json, 'utf-8');
            }

            console.log('😀Success!!!😀');
        })
        .catch(err => {
            console.log('😢Fail!!!😢');
            throw err;
        });
}

main();