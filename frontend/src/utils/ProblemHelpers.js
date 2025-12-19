export const getProblemSignature = (problem) => {
    if (!problem || !problem.title) {
        return {
            methodName: 'solution',
            params: [
                { type: 'vector<int>&', name: 'arr', javaType: 'int[]', pyType: 'arr', jsType: 'arr' }
            ],
            returnType: 'int',
            javaReturnType: 'int'
        };
    }

    const title = problem.title.toLowerCase();

    if (title.includes('two sum')) {
        return {
            methodName: 'twoSum',
            params: [
                { type: 'vector<int>&', name: 'nums', javaType: 'int[]', pyType: 'nums', jsType: 'nums' },
                { type: 'int', name: 'target', javaType: 'int', pyType: 'target', jsType: 'target' }
            ],
            returnType: 'vector<int>',
            javaReturnType: 'int[]'
        };
    }

    if (title.includes('palindrome')) {
        return {
            methodName: 'isPalindrome',
            params: [
                { type: 'int', name: 'x', javaType: 'int', pyType: 'x', jsType: 'x' }
            ],
            returnType: 'bool',
            javaReturnType: 'boolean'
        };
    }

    if (title.includes('sorted array')) {
        return {
            methodName: 'findMedianSortedArrays',
            params: [
                { type: 'vector<int>&', name: 'nums1', javaType: 'int[]', pyType: 'nums1', jsType: 'nums1' },
                { type: 'vector<int>&', name: 'nums2', javaType: 'int[]', pyType: 'nums2', jsType: 'nums2' }
            ],
            returnType: 'double',
            javaReturnType: 'double'
        };
    }

    // Default: Array problem
    return {
        methodName: 'solution',
        params: [
            { type: 'vector<int>&', name: 'arr', javaType: 'int[]', pyType: 'arr', jsType: 'arr' }
        ],
        returnType: 'int',
        javaReturnType: 'int'
    };
};

export const transformInput = (input, signature) => {
    // Transform JSON-like input string to space-separated values
    // Example: "[2,7,11,15], 9" -> "4 2 7 11 15 9"

    try {
        // Hacky parser for the specific format "[...], val" or just "[...]"
        // This is fragile but works for the sample problems

        // Remove brackets and replace commas with spaces
        let clean = input.replace(/\[/g, ' ').replace(/\]/g, ' ').replace(/,/g, ' ');

        // Split and filter empty
        const parts = clean.trim().split(/\s+/);

        // If it looks like an array (starts with size? no, we need to infer size)
        // For Two Sum: [2,7,11,15], 9
        // We want: 4 2 7 11 15 9

        // Better approach: Regex to find arrays
        const arrayRegex = /\[(.*?)\]/g;
        let match;
        let transformed = '';
        let lastIndex = 0;

        // If input has arrays
        if (input.includes('[')) {
            let processedInput = input;
            // Replace arrays with "SIZE elements..."
            processedInput = processedInput.replace(arrayRegex, (match, content) => {
                if (!content.trim()) return '0 ';
                const elements = content.split(',').map(s => s.trim());
                return `${elements.length} ${elements.join(' ')}`;
            });

            // Clean up remaining commas
            processedInput = processedInput.replace(/,/g, ' ');
            return processedInput.trim().replace(/\s+/g, ' ');
        }

        return parts.join(' ');
    } catch (e) {
        return input;
    }
};

export const generateBoilerplate = (language, problem) => {
    const sig = getProblemSignature(problem);

    if (language === 'cpp') {
        const params = sig.params.map(p => `${p.type} ${p.name}`).join(', ');
        return `class Solution {
public:
    ${sig.returnType} ${sig.methodName}(${params}) {
        // Write your code here
        return ${sig.returnType === 'void' ? '' : sig.returnType === 'bool' ? 'false' : sig.returnType === 'double' ? '0.0' : sig.returnType === 'vector<int>' ? '{}' : '-1'};
    }
};`;
    }

    if (language === 'java') {
        const params = sig.params.map(p => `${p.javaType} ${p.name}`).join(', ');
        return `class Solution {
    public ${sig.javaReturnType} ${sig.methodName}(${params}) {
        // Write your code here
        return ${sig.javaReturnType === 'void' ? '' : sig.javaReturnType === 'boolean' ? 'false' : sig.javaReturnType === 'double' ? '0.0' : sig.javaReturnType.includes('[]') ? 'new int[]{}' : '-1'};
    }
}`;
    }

    if (language === 'python') {
        const params = sig.params.map(p => p.pyType).join(', ');
        return `class Solution:
    def ${sig.methodName}(self, ${params}):
        # Write your code here
        pass`;
    }

    if (language === 'javascript') {
        const params = sig.params.map(p => p.jsType).join(', ');
        return `/**
${sig.params.map(p => ` * @param {${p.jsType === 'nums' ? 'number[]' : 'number'}} ${p.name}`).join('\n')}
 * @return {${sig.returnType === 'bool' ? 'boolean' : 'number'}}
 */
var ${sig.methodName} = function(${params}) {
    // Write your code here
};`;
    }

    return '';
};

export const getDriverCode = (language, userCode, problem) => {
    const sig = getProblemSignature(problem);

    if (language === 'cpp') {
        // Generate input reading logic based on params
        let inputReading = '';
        sig.params.forEach(p => {
            if (p.type.includes('vector')) {
                inputReading += `
    int n_${p.name};
    if (!(cin >> n_${p.name})) return 0;
    vector<int> ${p.name}(n_${p.name});
    for(int i=0; i<n_${p.name}; i++) cin >> ${p.name}[i];
            `;
            } else {
                inputReading += `
    ${p.type} ${p.name};
    cin >> ${p.name};
            `;
            }
        });

        const args = sig.params.map(p => p.name).join(', ');
        const printLogic = sig.returnType === 'vector<int>'
            ? `
        cout << "[";
        for(int i=0; i<result.size(); i++) cout << result[i] << (i<result.size()-1?",":"");
        cout << "]" << endl;
        `
            : `cout << boolalpha << result << endl;`;

        return `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <map>
#include <sstream>

using namespace std;

${userCode}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    ${inputReading}
    
    Solution sol;
    auto result = sol.${sig.methodName}(${args});
    
    ${printLogic}
    
    return 0;
}`;
    }

    // ... Implement other languages similarly
    // For brevity, I'll focus on C++ first as requested, but I should add Python at least

    if (language === 'python') {
        let inputReading = `
    import sys
    input = sys.stdin.read().split()
    if not input: return
    iterator = iter(input)
      `;

        sig.params.forEach(p => {
            if (p.pyType === 'nums' || p.pyType === 'nums1' || p.pyType === 'nums2' || p.pyType === 'arr') {
                inputReading += `
    n_${p.name} = int(next(iterator))
    ${p.name} = [int(next(iterator)) for _ in range(n_${p.name})]
              `;
            } else {
                inputReading += `
    ${p.name} = int(next(iterator))
              `;
            }
        });

        const args = sig.params.map(p => p.name).join(', ');

        return `${userCode}

def main():
    ${inputReading}
    
    sol = Solution()
    result = sol.${sig.methodName}(${args})
    
    if isinstance(result, list):
        print(f"[{','.join(map(str, result))}]")
    elif isinstance(result, bool):
        print("true" if result else "false")
    else:
        print(result)

if __name__ == "__main__":
    main()`;
    }

    return userCode;
};
