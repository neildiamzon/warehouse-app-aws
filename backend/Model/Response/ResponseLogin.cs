
namespace backend.Model.Response
{
    public class ResponseLogin
    {
        public string result { get; set; }
        public IEnumerable<string> role { get; set; }
    }
}
