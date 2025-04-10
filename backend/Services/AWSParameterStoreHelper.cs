using Amazon.SimpleSystemsManagement;
using Amazon.SimpleSystemsManagement.Model;
using System;
using System.Threading.Tasks;

public class ParameterStoreHelper
{
    private readonly IAmazonSimpleSystemsManagement _ssmClient;

    public ParameterStoreHelper()
    {
        _ssmClient = new AmazonSimpleSystemsManagementClient(); // Uses default AWS credentials (IAM Role, profile, etc.)
    }

    public async Task<string> GetParameterAsync(string name, bool isSecure = true)
    {
        var request = new GetParameterRequest
        {
            Name = name,
            WithDecryption = isSecure
        };

        var response = await _ssmClient.GetParameterAsync(request);
        return response.Parameter.Value;
    }
}
