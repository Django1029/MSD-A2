// config.js - Ӧ���������ļ�
const config = {
    // ����������
    server: {
        port: process.env.PORT || 3000,  // �����������ȣ�Ĭ��3000
        host: process.env.HOST || 'localhost'
    },

    // Ӧ�û�����Ϣ
    app: {
        name: 'TaskFlow',
        version: '1.0.0',
        description: 'Simple task management applications'
    },

    // ���ݴ洢����
    data: {
        tasksFile: './tasks.json',  // ���������ļ�·��
        backupDir: './backups'      // �����ļ�Ŀ¼
    },

    // ��ȫ����
    security: {
        maxTaskLength: 1000,        // ����������󳤶�
        enableCORS: true            // �Ƿ�����CORS
    },

    // ���ܿ���
    features: {
        enableBackup: true,         // �����Զ�����
        enableStatistics: true      // ����ͳ�ƹ���
    }
};

// ������֤����
function validateConfig() {
    if (config.server.port < 1 || config.server.port > 65535) {
        throw new Error('The slogan must be between 1 and 65535');
    }

    if (config.security.maxTaskLength <= 0) {
        throw new Error('The maximum length of the task must be greater than 0');
    }
}

// ִ��������֤
validateConfig();

module.exports = config;