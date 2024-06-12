const SEVERITY_FACTORS = {
    CRITICAL: ['Hardware Failure', 'Virus Infection', 'Data Loss', 'System Crash', 'Security Breach'],
    HIGH: ['Software Malfunction', 'Network Connectivity Issue'],
    MEDIUM: ['Peripheral Malfunction']
};

module.exports = function calculatePriority(issue) {
    let priority = 'Low';

    for (const [priorityLevel, factors] of Object.entries(SEVERITY_FACTORS)) {
        if (factors.includes(issue.type)) {
            priority = priorityLevel;
            break;
        }
    }

    return priority;
}