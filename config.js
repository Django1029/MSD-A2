// config.js - 应用主配置文件
const config = {
    // 服务器配置
    server: {
        port: process.env.PORT || 3000,  // 环境变量优先，默认3000
        host: process.env.HOST || 'localhost'
    },

    // 应用基本信息
    app: {
        name: 'TaskFlow',
        version: '1.0.0',
        description: ' task management application'
    },

    // 数据存储配置
    data: {
        tasksFile: './tasks.json',  // 任务数据文件路径
        backupDir: './backups'      // 备份文件目录
    },

    // 安全配置
    security: {
        maxTaskLength: 1000,        // 任务内容最大长度
        enableCORS: true            // 是否启用CORS
    },

    // 功能开关
    features: {
        enableBackup: true,         // 启用自动备份
        enableStatistics: true      // 启用统计功能
    }
};

// 配置验证函数
function validateConfig() {
    if (config.server.port < 1 || config.server.port > 65535) {
        throw new Error('The port number must be between 1 and 65535');
    }

    if (config.security.maxTaskLength <= 0) {
        throw new Error('The maximum length of the task must be greater than 0');
    }
}

// 执行配置验证
validateConfig();

module.exports = config;